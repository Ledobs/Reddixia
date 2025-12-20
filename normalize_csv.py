import csv
import os
import argparse

def normalize_path(directory, filename):
    # Ton tableau met "main/..." : en local, on enlève ce préfixe.
    directory = (directory or "").strip().lstrip("./")
    filename = (filename or "").strip()

    if directory.startswith("main/"):
        directory = directory[len("main/"):]
    if filename.startswith("main/"):
        filename = filename[len("main/"):]

    # Si "Répertoire" contient déjà le nom du fichier par erreur, on le gère proprement
    path = os.path.join(directory, filename) if filename else directory
    return os.path.normpath(path)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default=".", help="Chemin vers le repo local")
    ap.add_argument("--in", dest="inp", default="doc_inventory.csv", help="CSV d'entrée")
    ap.add_argument("--out", dest="out", default="doc_inventory_updated.csv", help="CSV de sortie")
    args = ap.parse_args()

    repo = os.path.abspath(args.repo)

    rows = []
    with open(args.inp, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(r)

    for r in rows:
        filename = r.get("Nom du fichier", "")
        directory = r.get("Répertoire", "")
        wanted = (r.get("Statut", "") or "").strip()

        rel_path = normalize_path(directory, filename)
        abs_path = os.path.join(repo, rel_path)

        exists = os.path.isfile(abs_path)
        dir_exists = os.path.isdir(os.path.dirname(abs_path))

        # Règles de statut :
        # - si fichier existe : "Existant" sauf si tu avais explicitement "Mettre à jour"
        # - si fichier n'existe pas : "À créer"
        if exists:
            if wanted.lower().startswith("mettre"):
                r["Statut"] = "Mettre à jour"
            else:
                r["Statut"] = "Existant"
        else:
            r["Statut"] = "À créer"

        # Ajoute une colonne d'observation (non destructive)
        note = []
        if not dir_exists:
            note.append("Dossier absent")
        if not exists:
            note.append("Fichier absent")
        r["Chemin normalisé"] = rel_path.replace("\\", "/")
        r["Observations"] = "; ".join(note) if note else ""

    # Écriture
    fieldnames = list(rows[0].keys()) if rows else ["Nom du fichier","Répertoire","Description","Statut","Chemin normalisé","Observations"]
    with open(args.out, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"OK -> {args.out}")

if __name__ == "__main__":
    main()
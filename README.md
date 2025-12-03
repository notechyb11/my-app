# Project Collaboration Guide - Git Workflow

## Initial Setup (One-Time Only)

### ----- Only do this part for the first time ------
Cloning for the first time
$ git clone (the link to the repository)
$ cd repo-name

### Setup (one-time per teammate)
Create your personal branch from main
$ git checkout main
$ git pull origin main
$ git checkout -b your-branch-name
$ git push -u origin your-branch-name

---------------------------------------------------

## Daily Workflow

# Save any work-in-progress
$ git add .
$ git commit -m "WIP: My current changes"

# Update main (get latest project version)
$ git checkout main
$ git pull origin main

# Update your personal branch with latest main
$ git checkout your-branch-name
$ git merge main <-- Very important part, no possible conflicts will show if not run

If conflicts appear:
- Open and fix the conflicted files
- Then Run:
$ git add .
$ git commit

# ------ Make your Changes -------

Save your changes to your branch
$ git add .
$ git commit -m "Describe what you changed"
$ git push

# ------ Merge (If unsure, please Pull Request instead for your code to be reviewed) -------

Merge your branch into main
$ git checkout main
$ git pull origin main
$ git merge your-branch-name
$ git push origin main

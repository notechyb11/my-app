# Project Collaboration Guide - Git Workflow

## Initial Setup (One-Time Only)

### ----- Only do this part for the first time ------
Cloning for the first time
```bash
git clone (the link to the repository)
cd repo-name
```

### Setup (one-time per teammate)
Create your personal branch from main
```bash
git checkout main
git pull origin main
git checkout -b your-branch-name
git push -u origin your-branch-name
```

---------------------------------------------------

## Daily Workflow

# Save any work-in-progress
```bash
git add .
git commit -m "WIP: My current changes"
```

# Update main (get latest project version)
```bash
git checkout main
git pull origin main
```

# Update your personal branch with latest main
```bash
git checkout your-branch-name
git merge main // <-- Very important part, no possible conflicts will show if not run
```

If conflicts appear:
- Open and fix the conflicted files
- Then Run:
```bash
git add .
git commit
```

# ------ Make your Changes -------

Save your changes to your branch
```bash
git add .
git commit -m "Describe what you changed"
git push
```

# ------ Merge (If unsure, please Pull Request instead for your code to be reviewed) -------

Merge your branch into main
```bash
git checkout main
git pull origin main
git merge your-branch-name
git push origin main
```

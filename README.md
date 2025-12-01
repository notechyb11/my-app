##### **----- Only do this part for the first time ------**

##### **Cloning for the first time**

git clone https://github.com/notechyb11/my-app.git

cd repo-name

##### 

##### **Setup (one-time per teammate)**

###### **Create your personal branch from main**

git checkout main

git pull origin main

git checkout -b your-branch-name

git push -u origin your-branch-name

##### 



# **Daily Workflow**



###### **Update main (get latest project version)**

git checkout main

git pull origin main



###### **Update your personal branch with latest main**

git checkout your-branch-name

git fetch origin

git rebase origin/main <-- Need to make changes before running or else error occurs



If conflicts appear:

* Open and fix the conflicted files
* Then Run:

git add .

git rebase --continue



------ Make your Changes -------



###### **Save your changes to your branch**

git add .

git commit -m "Describe what you changed"

git push



###### **Merge your branch into main**

git checkout main
git pull origin main
git merge your-branch-name
git push origin main


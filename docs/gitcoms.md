As you'd do with git in general, the approach to choose here is to clone your other git repo (ex. on bitbucket) to your local machine:

    git clone <bitbucket-repo-url>

Your local clone has then your other repo (bitbucket etc.) as remote repo. Your remote repo is stored with the alias "origin" (the default alias used by git if you clone). You then add the openshift repo as remote to your clone. You do that while explicitly using an alias for the remote repo you add - I'm using "openshift" as alias here:

    git remote add openshift -f <openshift-git-repo-url>

In order to then be able to push the code from your local git repo to openshift you first have to merge your openshift repo with your local bitbucket clone. You do that by issuing locally:

    git merge openshift/master -s recursive -X ours

With this command you tell git to merge the master branch in the openshift git repo with your local git repo. You tell it to merge using the recursive merging strategy and to choose your ("ours") version when there are conflicts.

Once the merge is executed you're ready to push your git repo to openshift. You do that by doing:

    git push openshift HEAD

You tell git to push your local code to the HEAD branch on the remote repo called "openshift" (the alias we stored the openshift git repo at, some paragraphs further up).

eval "$(ssh-agent -s)"
echo "$DEPLOY_KEY" > deploy_key.pem
chmod 600 deploy_key.pem
ssh-add deploy_key.pem
git remote add deploy $REPO
git push deploy master
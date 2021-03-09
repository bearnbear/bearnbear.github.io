npm run build
rm -f ./docs
mv ./build ./docs
git add .
git commit -m "feat: create build file"
git push

npm run build
rm -rf docs
mv build docs
cp CNAME docs/
git add .
git commit -m "feat: create build file"
git push

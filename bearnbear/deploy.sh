npm run build
rm -f ../docs
mv ./build ../docs
git add .
git commit -m "create build file"
git push
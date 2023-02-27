source .env
git clone $REPOSITORY_URL
cd $REPOSITORY_NAME
git checkout -b __test__
echo "Hello, world!" > test.txt
git add test.txt
git status
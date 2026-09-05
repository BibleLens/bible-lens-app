#!/bin/zsh
set -eu
cd -- "$(dirname -- "$0")"

preview_url="http://127.0.0.1:3017"
if curl --fail --silent --max-time 2 "$preview_url/explore/jesus-birth/data" | node -e 'let data="";process.stdin.on("data",chunk=>data+=chunk);process.stdin.on("end",()=>{try{process.exit(JSON.parse(data).studyId==="jesus-birth"?0:1)}catch{process.exit(1)}})'; then
  open "$preview_url/"
  exit 0
fi

if lsof -tiTCP:3017 -sTCP:LISTEN >/dev/null; then
  print "Another local preview is using port 3017. Close it before opening this Explorer preview."
  exit 1
fi

if [[ ! -d node_modules ]]; then
  npm ci
fi
npm run build
node_modules/.bin/next start --hostname 127.0.0.1 --port 3017 &
preview_pid=$!
trap 'kill "$preview_pid" 2>/dev/null || true' EXIT INT TERM
for attempt in {1..30}; do
  if curl --fail --silent --max-time 1 "$preview_url/explore/jesus-birth/data" >/dev/null; then
    open "$preview_url/"
    print "The Explorer is ready. Keep this window open while reviewing."
    wait "$preview_pid"
    exit 0
  fi
  sleep 1
done
print "The preview did not become ready. Check the messages above."
exit 1

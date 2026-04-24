#!/bin/bash
echo "=== VERIFYING 26 PAGES ==="
echo ""

for f in $(find dist -name "*.html" -type f | sort); do
  filename=$(basename "$f")
  echo "FILE: $filename"
  
  title=$(grep -o '<title>[^<]*</title>' "$f" | sed 's/<[^>]*>//g' | head -1)
  echo "  TITLE: $title"
  
  canonical=$(grep -o '<link rel="canonical" href="[^"]*"' "$f" | sed 's/.*href="\([^"]*\)".*/\1/')
  echo "  CANONICAL: $canonical"
  
  ogimage=$(grep -o '<meta property="og:image" content="[^"]*"' "$f" | sed 's/.*content="\([^"]*\)".*/\1/')
  echo "  OG:IMAGE: $ogimage"
  
  twittercard=$(grep -o '<meta name="twitter:card" content="[^"]*"' "$f" | sed 's/.*content="\([^"]*\)".*/\1/')
  if [ -n "$twittercard" ]; then
    echo "  TWITTER:CARD: $twittercard"
  fi
  
  echo ""
done

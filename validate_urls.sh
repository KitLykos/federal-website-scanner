#!/bin/bash

# Variables
SITEMAP_URL="$1"
VALID_URLS_FILE="valid_urls.txt"
MAX_URLS=200  # adjust as needed

echo "Fetching URLs from sitemap: $SITEMAP_URL"

curl -s "$SITEMAP_URL" \
  | xmllint --format - \
  | grep "<loc>" \
  | sed 's/<loc>\(.*\)<\/loc>/\1/' \
  | grep -viE 'login|signin|auth|search|find|admin|dashboard|cms|wp-|utm_|gclid|sitemap|rss|feed|index' \
  | head -n "$MAX_URLS" \
  > all_urls.txt


echo "Checking URL status codes..."

# Check each URL status quickly and save only 200 status URLs
> "$VALID_URLS_FILE"
while read -r url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$status" -eq 200 ]; then
    echo "$url" >> "$VALID_URLS_FILE"
    echo "✅ [$status] $url"
  else
    echo "❌ [$status] $url"
  fi
done < all_urls.txt

echo "Valid URLs saved to $VALID_URLS_FILE"
#!/bin/bash

# Get absolute path of current directory
APP_DIR="$(pwd)"
DESKTOP_FILE="$HOME/.config/autostart/github-widget.desktop"
ELECTRON_BIN="$APP_DIR/node_modules/.bin/electron"

# Ensure electron binary exists
if [ ! -f "$ELECTRON_BIN" ]; then
    echo "Error: Electron binary not found at $ELECTRON_BIN"
    echo "Please run 'npm install' first."
    exit 1
fi

# Ensure autostart directory exists
mkdir -p "$HOME/.config/autostart"

# Create .desktop file
cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Type=Application
Name=GitHub Widget
Comment=GitHub Activity Widget
Exec="$ELECTRON_BIN" "$APP_DIR"
Terminal=false
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
EOF

chmod +x "$DESKTOP_FILE"

echo "✅ Autostart configured successfully!"
echo "File created at: $DESKTOP_FILE"
echo "The widget will now start automatically on login."

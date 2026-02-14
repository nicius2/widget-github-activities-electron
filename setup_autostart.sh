#!/bin/bash

# Get absolute path of current directory
APP_DIR="$(pwd)"
DESKTOP_FILE="$HOME/.config/autostart/github-widget.desktop"
RUN_SCRIPT="$APP_DIR/run_widget.sh"
ELECTRON_BIN="$APP_DIR/node_modules/.bin/electron"

# Ensure electron binary exists
if [ ! -f "$ELECTRON_BIN" ]; then
    echo "Error: Electron binary not found at $ELECTRON_BIN"
    echo "Please run 'npm install' first."
    exit 1
fi

# Create the wrapper runner script
echo "Creating runner script at $RUN_SCRIPT..."
cat > "$RUN_SCRIPT" <<EOF
#!/bin/bash
cd "$APP_DIR"
# Setup environment from .env
set -a
[ -f .env ] && source .env
set +a
# Run electron
"$ELECTRON_BIN" .
EOF

chmod +x "$RUN_SCRIPT"

# Ensure autostart directory exists
mkdir -p "$HOME/.config/autostart"

# Create .desktop file pointing to the runner script
cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Type=Application
Name=GitHub Widget
Comment=GitHub Activity Widget
Exec="$RUN_SCRIPT"
Terminal=false
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
EOF

chmod +x "$DESKTOP_FILE"

echo "✅ Autostart configured successfully!"
echo "Files created:"
echo " - Runner: $RUN_SCRIPT"
echo " - Desktop Entry: $DESKTOP_FILE"
echo "The widget will now start automatically on login."

# Define variables
TARGET = url_shortener
SRC_DIR = src
OUT_DIR = target
RUSTC = rustc
CARGO = cargo
RUSTFLAGS = --edition=2018
MIGRATION_NAME = 

# Define phony targets
.PHONY: all clean run watch migrate config

# Default target
all: $(TARGET)

# Build the project
$(TARGET): $(SRC_DIR)/*.rs
    $(CARGO) build

# Run the project
run:
    $(CARGO) run

# Watch for changes and run the project with shuttle
watch:
    cargo watch -x 'make run'

# Run migrations
migrate:
    @if [ -z "$(MIGRATION_NAME)" ]; then \
        echo "Error: MIGRATION_NAME is not set. Usage: make migrate MIGRATION_NAME=<migration_name>"; \
    else \
        $(CARGO) sqlx migrate add -r $(MIGRATION_NAME); \
    fi

# Configure and run the project
config:
    $(CARGO) build && DATABASE_URL=your_database_url $(CARGO) run shuttle

# Clean the project
clean:
    $(CARGO) clean

# Remove the target directory
clean:
	rm -rf $(OUT_DIR)






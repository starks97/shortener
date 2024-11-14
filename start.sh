
# Check for and kill any process using port 8000
if lsof -i :8000; then
  PID=$(lsof -t -i :8000)
  echo "Killing process $PID on port 8000..."
  kill -9 $PID
fi

# Start the backend API
cd backend
cargo run &

# Start the frontend
cd ../web
pnpm dev &

# Wait for both processes to end (infinite loop to keep them running)
wait

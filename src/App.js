import { useState, useCallback, useEffect } from "react";
import { Square, HoverSquares } from "./components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const baseUrl = "https://demo7919674.mockable.io";

function App() {
  const [modes, setModes] = useState([]);
  const [squares, setSquares] = useState(Array(25).fill(false));
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedMode, setSelectedMode] = useState("");

  const getModes = useCallback(async () => {
    const response = await axios.get(baseUrl);
    setModes(response.data);
  }, []);

  const handleChange = (event) => {
    setSelectedMode(event.target.value);
  };

  const handleHover = (i) => {
    setSquares((prev) =>
      prev.map((item, index) => (index === i ? !item : item))
    );
  };

  const startGame = useCallback(() => setGameStarted(true));

  useEffect(() => {
    getModes();
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <Stack
        spacing={2}
        style={{
          padding: 50,
        }}
      >
        <div style={{ width: 500 }}>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="select-mode-label">Pick mode</InputLabel>
              <Select
                labelId="select-mode-label"
                id="mode-select"
                value={selectedMode}
                onChange={handleChange}
              >
                {modes.map((mode) => (
                  <MenuItem key={mode.name} value={mode}>
                    {mode.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={startGame}>
              Start
            </Button>
          </Stack>
        </div>

        {gameStarted && selectedMode && (
          <div
            style={{
              maxWidth: `${selectedMode.field * 5 + 4}px`,
              background: "#919191",
              display: "inline-block",
              border: `1px solid #919191`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(5, ${selectedMode.field}px)`,
                gridTemplateRows: `repeat(5, ${selectedMode.field}px)`,
                gridGap: `1px`,
              }}
            >
              {squares.map((item, index) => (
                <Square
                  size={selectedMode.field}
                  selected={item}
                  onHover={() => handleHover(index)}
                />
              ))}
            </div>
          </div>
        )}
      </Stack>
      {gameStarted && <HoverSquares squares={squares} />}
    </Stack>
  );
}

export default App;

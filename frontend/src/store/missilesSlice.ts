import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IMissile} from '../types';

interface Missile {
  id: string;
  name: string;
  status: 'available' | 'launched' | 'intercepted'; 
}

interface MissileState {
  missiles: Missile[];
}

const initialState: MissileState = {
  missiles: [],
};

const missileSlice = createSlice({
  name: 'missiles', 
  initialState, 
  reducers: {
    //טעינת נתונים מהשרת
    loadMissiles(state, action: PayloadAction<Missile[]>) {
      state.missiles = action.payload; 
    },
    // שיגור טיל ועידכון סטטוס
    launchMissile(state, action: PayloadAction<string>) {
      const missile = state.missiles.find(m => m.id === action.payload);
      if (missile) {
        missile.status = 'launched';
      }
    },
    //שיגור מיירט ושינוי סטטוס
    interceptMissile(state, action: PayloadAction<string>) {
      const missile = state.missiles.find(m => m.id === action.payload);
      if (missile) {
        missile.status = 'intercepted';
      }
    },
  },
});

export const { loadMissiles, launchMissile, interceptMissile } = missileSlice.actions;
export default missileSlice.reducer;

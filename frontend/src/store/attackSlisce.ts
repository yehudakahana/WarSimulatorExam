import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadMissiles } from './missilesSlice';

interface Rocket {
  id: string;
  type: string;
  timeToHit: string;
  status: string;
}

export interface AttackState {
  organization: string;
  location: string;
  ammo: Record<string, number>;
  launchedRockets: Rocket[];
}

const initialState: AttackState = {
  organization: "Hamas",
  location: "North",
  ammo: {
    Grad: 1,
    SuperSonic: 7,
    BoomMissile: 2,
    Kasam: 9
  },
  launchedRockets: []
};

const attackSlice = createSlice({
  name: 'attack',
  initialState,
  reducers: {
    loadState(state, action: PayloadAction<AttackState>) {
      state.organization = action.payload.organization;
      state.location = action.payload.location;
      state.ammo = action.payload.ammo;
      state.launchedRockets = action.payload.launchedRockets;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    launchRocket(state, action: PayloadAction<Rocket>) {
      const { type } = action.payload;
      if (state.ammo[type] > 0) {
        state.ammo[type] -= 1;
        state.launchedRockets.push(action.payload);
      }
    },
    updateRocketStatus(state, action: PayloadAction<{ id: string; status: string }>) {
      const rocket = state.launchedRockets.find((r) => r.id === action.payload.id);
      if (rocket) {
        rocket.status = action.payload.status;
      }
    }
  }
});

export const { setLocation, launchRocket, updateRocketStatus, loadState } = attackSlice.actions;

export default attackSlice.reducer;

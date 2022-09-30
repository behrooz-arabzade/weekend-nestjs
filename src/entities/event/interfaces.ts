export interface IEventLimitation {
  minUserNumber: number;
  maxUserNumber: number;
  schedule: {
    date: Date;
    startTime: string;
    endTime: string;
    deadline: Date;
  };
}

export enum WEventState {
  Ready,
  Registering,
  RegisterationCompleted,
  RegisterationFailed,
  Finished,
  Canceled,
}

export enum AccountingType {
  ByOwner,
  Shared,
  Custom,
}

export enum ReservingState {
  Reserved,
  NotReserved,
}

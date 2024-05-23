export interface PresaleWindowProps {}

export interface CurrentStageDetailsProps {
  currentStage: {
    kf_amt_to_sell_in_stage: number;
    title: string;
    per_usdc: number;
    next_per_usdc: number;
  };
  remainBal: number;
}

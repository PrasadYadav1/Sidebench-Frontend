interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export interface LookBooksApiProps {
  id: number;
  customerId: number;
  noOfLooks: number;
  statusId: number;
  occasion: string;
  dueBy: string;
  sentAt: string;
  status: {
    id: number;
    name: string;
  };
}

export interface LookBooksApiRows {
  'To Do': Array<LookBooksApiProps>;
  'In Progress': Array<LookBooksApiProps>;
  Queued: Array<LookBooksApiProps>;
}

export interface LookBooksApiResponse {
  data: {
    rows: LookBooksApiRows;
    count: number;
  };
}

export default TabPanelProps;

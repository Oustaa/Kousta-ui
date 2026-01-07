---
sidebar_position: 1
---

## Usage

```tsx
import { useState } from "react"
import { DataTable } from "@kousta-ui/table"

const [headers, setHeaders] = useState({
  id:{
    value: "id"
  },
  title:{
    value: "title",
  },
  "start date" : {
    value: "start_date",
    type: "date",
  }
});

<DataTable
  data={[]} /* the data you want to display, data should be an array of objects */
  loading={false} // boolean
  headers={headers}
/>
```


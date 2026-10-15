import {
  Badge,
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "opensource-ui"

const orders = [
  { id: "#3210", customer: "Olivia Martin", status: "Paid", amount: "$742.00" },
  {
    id: "#3209",
    customer: "Ava Johnson",
    status: "Pending",
    amount: "$316.00",
  },
  { id: "#3204", customer: "Liam Chen", status: "Paid", amount: "$489.00" },
  {
    id: "#3203",
    customer: "Noah Patel",
    status: "Refunded",
    amount: "$276.00",
  },
]

const statusVariant = {
  Paid: "secondary",
  Pending: "outline",
  Refunded: "destructive",
} as const

export function Orders() {
  return (
    <div className="w-full rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox aria-label="Select all" />
            </TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((o, i) => (
            <TableRow key={o.id} data-state={i === 1 ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  defaultChecked={i === 1}
                  aria-label={`Select ${o.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{o.id}</TableCell>
              <TableCell>{o.customer}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    statusVariant[o.status as keyof typeof statusVariant]
                  }
                >
                  {o.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {o.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right tabular-nums">$1,823.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export function Simple() {
  return (
    <Table>
      <TableCaption>
        Type scale generated from a 16px base, ratio 1.25.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-right">Line height</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["text-sm", "14px", "20px"],
          ["text-base", "16px", "24px"],
          ["text-xl", "20px", "28px"],
          ["text-2xl", "25px", "32px"],
        ].map(([t, s, l]) => (
          <TableRow key={t}>
            <TableCell className="font-mono">{t}</TableCell>
            <TableCell className="tabular-nums">{s}</TableCell>
            <TableCell className="text-right tabular-nums">{l}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

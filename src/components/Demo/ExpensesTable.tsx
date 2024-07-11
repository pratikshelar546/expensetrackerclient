import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import DynamicModal from "@/CommonComponent/DynamicModal";
import AddNewExpense from "./AddNewExpense";

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function ExpensesTable() {
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(rows);
  console.log(row);

  return (
    <>
      <TableContainer component={Paper} className="bg-transparent text-white">
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead className="text-white">
            <TableRow>
              <TableCell align="center" colSpan={3} className="text-white">
                Details
              </TableCell>
              <TableCell align="right" className="text-white">
                Price
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-white">Desc</TableCell>
              <TableCell align="right" className="text-white">
                Qty.
              </TableCell>
              <TableCell align="right" className="text-white">
                Unit
              </TableCell>
              <TableCell align="right" className="text-white">
                Sum
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row?.map((row) => (
              <TableRow key={row.desc}>
                <TableCell className="text-white">{row.desc}</TableCell>
                <TableCell align="right" className="text-white">
                  {row.qty}
                </TableCell>
                <TableCell align="right" className="text-white">
                  {row.unit}
                </TableCell>
                <TableCell align="right" className="text-white">
                  {ccyFormat(row.price)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2} className="text-white" align="center">
                Total
              </TableCell>
              <TableCell align="right" className="text-white">
                {ccyFormat(invoiceSubtotal)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="p-3 w-full">
        <button
          className="text-white border border-gray-400 py-2 px-4 hover:bg-gray-300 hover:text-gray-900 rounded-xl relative right-0"
          onClick={() => setOpen(true)}
        >
          Add Expense
        </button>
      </div>

      {open && (
        <DynamicModal
          open={open}
          setOpen={setOpen}
          title="Add Your Expenses"
          btnTitle="Submit"
          component={<AddNewExpense />}
        />
      )}
      {console.log(rows)}
    </>
  );
}

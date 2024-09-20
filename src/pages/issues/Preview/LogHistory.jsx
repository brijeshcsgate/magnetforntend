import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { deleteIcon } from '@/assets/Icons';
// import { formatDate } from 'react-datepicker/dist/date_utils';
import { formatDate, formatDateToDDMMYYYY } from '@/utils/dateHelper';
const LogHistoryTable = ({ isOpen, onClose, response }) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose(); // Handle modal close
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Issue Record History</DialogTitle>
        </DialogHeader>
        <div className="">
          <Table className="relative mt-4 border border-teal-250">
            <TableHeader>
              <TableRow className="text-[#424750]">
                <TableHead className="min-w-[150px]">Sr. No</TableHead>
                <TableHead className="min-w-[150px]">Updated By</TableHead>
                <TableHead className="min-w-[130px]">Updated Status</TableHead>
                <TableHead className="min-w-[130px]">Udpated Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.map((elem, index) => (
                <TableRow
                  key={index}
                  className="shadow-[4px_4px_20px_0px_#0000001A] hover:bg-[#F4FCFF]"
                >
                  <TableCell className="text-[12px]">{index + 1}</TableCell>
                  <TableCell className="text-[12px]">
                    {elem.actionBy?.name?.english}
                  </TableCell>
                  <TableCell className="text-[12px]">
                    {elem.updatedStatus}
                  </TableCell>
                  <TableCell className="text-[12px]">
                    {formatDate(elem.updatedOn)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogHistoryTable;

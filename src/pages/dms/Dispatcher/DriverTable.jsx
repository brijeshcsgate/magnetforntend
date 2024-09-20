import { APIS } from '@/constants/api.constant';
import { putApi } from '@/services/method';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { formatDate } from '@/utils/dateHelper';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '/src/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn, toTitleCase } from '@/lib/utils';
import {
  BusIcon,
  CondutorIcon,
  DriverCogIcon,
  DriverIcon,
  RouteIcon,
} from '@/components/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import Marquee from 'react-fast-marquee';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisIcon } from 'lucide-react';
import { ArrowUpDownIcon } from 'lucide-react';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import apiService from '@/lib/apiService';
import { CustomSelect } from '@/components/common/CustomSelect';

export default function DriverTable({ selectedDate }) {
  const {
    data: timeTableData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dispatch', selectedDate],
    queryFn: async () => {
      const startDate = new Date(selectedDate);

      const endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59, 999);
      return await apiService
        .get(`${APIS.DISPATCH}`, {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        })
        .then(async (res) => {
          return res?.data;
        });
    },
    enabled: !!selectedDate,
  });

  const [search, setSearch] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      field: 'Status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Badge variant={params.value}>{toTitleCase(params.value)}</Badge>
      ),
    },
    { field: 'Driver1', headerName: 'Driver 1', width: 110 },
    { field: 'Driver2', headerName: 'Driver 2', width: 110 },
    { field: 'Conductor', headerName: 'Conductor', width: 110 },
    { field: 'Vehicle', headerName: 'Vehicle', width: 150 },
    { field: 'Route', headerName: 'Route', width: 250 },
    { field: 'Duration', headerName: 'Duration', width: 100 },
    { field: 'Start', headerName: 'Start', width: 100 },
    { field: 'End', headerName: 'End', width: 100 },
    { field: 'StartLocation', headerName: 'Start Location', width: 150 },
    { field: 'EndLocation', headerName: 'End Location', width: 150 },
  ];

  const filteredRows = useMemo(() => {
    if (!timeTableData) return [];
    return timeTableData
      .map((row, index) => ({
        id: index,
        Status: row.status,
        Driver1: toTitleCase(row.drivers[0]?.name) || '-',
        Driver2:
          (row.drivers[1]?.name && toTitleCase(row.drivers[1]?.name)) || '-',
        Conductor: row.conductor?.name || '-',
        Vehicle: row.vehicle?.registrationNumber || '-',
        Route: row.routeName,
        Duration: row.duration || '-',
        Start: formatDate(row.startDate, 'time'),
        End: formatDate(row.endDate, 'time'),
        StartLocation: row.origin?.name,
        EndLocation: row.destination?.name,
        data: row,
      }))
      .filter((row) =>
        Object.values(row)
          .filter((value) => typeof value === 'string') // Only filter string values
          .some((value) => value.toLowerCase().includes(search.toLowerCase()))
      );
  }, [timeTableData, search]);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  return (
    <>
      <Tabs defaultValue="driver">
        <TabsList className="flex justify-between items-center mt-3">
          <div className="flex gap-4">
            <TabsTrigger value="driver" className="flex items-center gap-1">
              <DriverCogIcon />
              Driver
            </TabsTrigger>
            <TabsTrigger value="vehicle" className="flex items-center gap-1">
              <BusIcon />
              Vehicle
            </TabsTrigger>
          </div>
          <div className="w-fit flex gap-4 items-center -mt-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="py-2 pr-10 pl-4"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                  <SearchIcon className="size-4" />
                </span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="group mt-auto">
                  <EllipsisIcon className="text-blue-primary-200 group-hover:text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export CSV</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TabsList>
        <TabsContent value="driver">
          <section className="w-full justify-between h-[calc(100vh-71px-51px)] p-4 flex gap-4 transition-all">
            <section
              className={cn(
                'transition-all h-full',
                open ? 'w-[calc(100%-316px)]' : 'w-full'
              )}
            >
              <DataGridTable
                filteredRows={filteredRows}
                columns={columns}
                isLoading={isLoading}
                handleRowClick={handleRowClick}
              />
            </section>
            <RightSheet
              open={open}
              setOpen={setOpen}
              selectedRow={selectedRow}
              refetch={refetch}
            />
          </section>
        </TabsContent>
        <TabsContent value="vehicle">
          <section className="w-full justify-between h-[calc(100vh-71px-51px)] p-4 flex gap-4 transition-all">
            <section
              className={cn(
                'transition-all h-full',
                open ? 'w-[calc(100%-316px)]' : 'w-full'
              )}
            >
              <DataGridTable
                filteredRows={filteredRows}
                columns={columns}
                isLoading={isLoading}
                handleRowClick={handleRowClick}
              />
            </section>
            <RightSheet
              open={open}
              setOpen={setOpen}
              selectedRow={selectedRow}
              refetch={refetch}
            />
          </section>
        </TabsContent>
      </Tabs>
    </>
  );
}
function DataGridTable({ filteredRows, columns, isLoading, handleRowClick }) {
  return (
    <DataGrid
      rows={filteredRows}
      columns={columns}
      onRowClick={handleRowClick}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      disableRowSelectionOnClick
      loading={isLoading}
    />
  );
}

function RightSheet({ open, setOpen, selectedRow, refetch }) {
  const stageIn = useMutation({
    mutationKey: ['stageIn'],
    mutationFn: async (data) => {
      return await putApi(
        `/v1/time-table/dispatch/in-out-time/${data?.id}?type=stageInTime`,
        data
      ).then((res) => {
        if (res.code === 200) {
          toast.success('In Time Added Successfully');
          refetch();
          setOpen(false);
        }
        return res;
      });
    },
  });

  const stageOut = useMutation({
    mutationKey: ['stageOut'],
    mutationFn: async (data) => {
      return await putApi(
        `/v1/time-table/dispatch/in-out-time/${data?.id}?type=stageOutTime`,
        data
      ).then((res) => {
        if (res.code === 200) {
          toast.success('Out Time Added Successfully');
          refetch();
          setOpen(false);
        }
        return res;
      });
    },
  });

  const [openCrewChange, setOpenCrewChange] = useState(false);
  const [openCrewChangeData, setOpenCrewChangeData] = useState({
    crewName: 'Driver',
  });
  const [openCrewDelete, setOpenCrewDelete] = useState(false);
  const [openCrewDeleteData, setOpenCrewDeleteData] = useState({
    crewName: 'Driver',
  });

  if (selectedRow) {
    const data = selectedRow && selectedRow?.data;

    const DutyAttributes = ({ title, name, action }) => {
      return (
        <div className="grid grid-cols-3 gap-2">
          <div className="flex gap-2 items-center">{title}</div>
          <div className="flex gap-2 items-center whitespace-nowrap">
            {name}
          </div>
          <div className="flex gap-2 items-center justify-end">{action}</div>
        </div>
      );
    };

    return (
      <>
        <section
          className={cn(
            open
              ? 'flex flex-col min-w-[300px] max-w-[300px] bg-blue-primary-200 p-0 text-white rounded-[4px] relative'
              : 'hidden'
          )}
        >
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <XIcon className="size-4" />
          </div>
          <div className="font-medium text-base p-4 pb-0">{data.tripCode}</div>
          <section className="flex flex-col gap-2 py-2 border-b border-[#1463B0] px-4">
            <div className="bg-green-500 rounded-full text-center text-xs font-medium border py-0.5">
              Running
            </div>
            <div className="grid grid-cols-3 w-full text-xs">
              <div className="col-span-3 w-full text-white text-center flex items-center gap-2">
                <div className="w-4 h-4">
                  <RouteIcon className="w-4 h-4" />
                </div>
                <div className="w-full overflow-hidden">
                  <Marquee>
                    &ensp;{data.routeName}&ensp;| &ensp;{data.routeCode}&ensp;{' '}
                  </Marquee>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                  padding: 0,
                }}
              >
                <TimelineItem
                  sx={{
                    minHeight: '25px',
                  }}
                >
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{ backgroundColor: '#22c55e', marginY: 0.5 }}
                    />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ paddingY: 0, fontSize: '12px' }}>
                    {formatDate(data.startTime, 'time')} | {data.origin.name}
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem
                  sx={{
                    minHeight: '25px',
                  }}
                >
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{ backgroundColor: '#ef4444', marginY: 0.5 }}
                    />
                  </TimelineSeparator>
                  <TimelineContent sx={{ paddingY: 0, fontSize: '12px' }}>
                    {formatDate(data.endDate, 'time')} | {data.destination.name}
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </div>
          </section>
          <ScrollArea className="h-[calc(100vh-340px)]">
            <section className="px-4 border-b border-[#1463B0] pb-4 w-full">
              <div className="font-medium pt-1 text-sm">Duty Attributes</div>
              <div className="grid grid-cols-3 w-full mt-1 text-xs">
                <div className="col-span-2 w-full bg-[#0D4A86] px-4 py-2 text-white text-center flex items-center gap-2">
                  <div className="w-4 h-4">
                    <BusIcon className="size-4 " />
                  </div>
                  <div className="w-[calc(100%-24px)]">
                    <Marquee>
                      &ensp;{data.vehicle.registrationNumber}&ensp;
                    </Marquee>
                  </div>
                </div>
                <div className=" bg-[#115AA0] text-center px-4 py-2 text-white">
                  {data.vehicle.totalSeats}
                </div>
              </div>
              <div className="flex flex-col space-y-2 mt-2 text-xs">
                <DutyAttributes
                  title={
                    <>
                      <DriverIcon className="size-4" /> Driver 1
                    </>
                  }
                  name={
                    data.drivers[0] ? toTitleCase(data.drivers[0]?.name) : '-'
                  }
                  action={
                    <>
                      <Button
                        variant="outline"
                        className="group hover:border-white"
                        size="icon"
                        onClick={() => {
                          setOpenCrewChange(true);
                          setOpenCrewChangeData({
                            crewName: 'Driver',
                            index: 0,
                            id: data.id,
                          });
                        }}
                      >
                        <ArrowUpDownIcon className="size-4" />
                      </Button>
                      {data.drivers[0] && (
                        <Button
                          variant="outline"
                          className="group hover:border-white"
                          size="icon"
                          onClick={() => {
                            setOpenCrewDelete(true);
                            setOpenCrewDeleteData({
                              crewName: 'Driver',
                              index: 0,
                              id: data.id,
                            });
                          }}
                        >
                          <Trash2Icon className="size-4" />
                        </Button>
                      )}
                    </>
                  }
                />
                <DutyAttributes
                  title={
                    <>
                      <DriverIcon className="size-4" /> Driver 2
                    </>
                  }
                  name={
                    data.drivers[1] ? toTitleCase(data.drivers[1]?.name) : '-'
                  }
                  action={
                    <>
                      <Button
                        variant="outline"
                        className="group hover:border-white"
                        size="icon"
                        onClick={() => {
                          setOpenCrewChange(true);
                          setOpenCrewChangeData({
                            crewName: 'Driver',
                            index: 1,
                            id: data.id,
                          });
                        }}
                      >
                        <ArrowUpDownIcon className="size-4" />
                      </Button>
                      {data.drivers[1] && (
                        <Button
                          variant="outline"
                          className="group hover:border-white"
                          size="icon"
                          onClick={() => {
                            setOpenCrewDelete(true);
                            setOpenCrewDeleteData({
                              crewName: 'Driver',
                              index: 1,
                              id: data.id,
                            });
                          }}
                        >
                          <Trash2Icon className="size-4" />
                        </Button>
                      )}
                    </>
                  }
                />

                <DutyAttributes
                  title={
                    <>
                      <CondutorIcon className="size-4" /> Conductor
                    </>
                  }
                  name={toTitleCase(data.conductor.name) || '-'}
                  action={
                    <>
                      <Button
                        variant="outline"
                        className="group hover:border-white"
                        size="icon"
                        onClick={() => {
                          setOpenCrewChange(true);
                          setOpenCrewChangeData({
                            crewName: 'Conductor',
                            index: 0,
                            id: data.id,
                          });
                        }}
                      >
                        <ArrowUpDownIcon className="size-4" />
                      </Button>
                      {data.conductor.id != '' && (
                        <Button
                          variant="outline"
                          className="group hover:border-white"
                          size="icon"
                          onClick={() => {
                            setOpenCrewDelete(true);
                            setOpenCrewDeleteData({
                              crewName: 'Conductor',
                              index: 0,
                              id: data.id,
                            });
                          }}
                        >
                          <Trash2Icon className="size-4" />
                        </Button>
                      )}
                    </>
                  }
                />

                <DutyAttributes
                  title={
                    <>
                      <RouteIcon className="size-4" /> Route
                    </>
                  }
                  name={data.origin.name + '-' + data.destination.name}
                />
              </div>
            </section>

            <section className="border-b border-[#1463B0] pb-1">
              <div className="font-medium pt-1 text-sm px-4">Events</div>

              <CrewEvents data={data} />
            </section>

            <section className="px-4 border-b border-[#1463B0] pb-4">
              <div className="font-medium  text-sm">Stages</div>
              <section className="flex items-center text-xs gap-4 text-white -mx-4 bg-[#50A7FB] px-4 py-2 my-4 mt-1">
                <div className="">Type</div>
                <div className="flex-1">Name</div>
                <div className="flex items-center justify-between gap-4 w-[80px]">
                  <div className="">
                    STA <br /> ETA
                  </div>
                  <div className="">
                    STD
                    <br /> ETD
                  </div>
                </div>
              </section>
              <div className="flex flex-col space-y-2">
                {data.stages.map((item, index) => (
                  <section key={index} className="flex gap-4 text-xs">
                    <div className="bg-[#54F8F8] rounded-md size-6 ml-1 flex items-center justify-center my-auto">
                      <BusIcon className="size-4 text-blue-primary-200" />
                    </div>
                    <div className="flex-1 flex items-center">{item.name}</div>
                    <div className="flex items-center justify-between gap-4 w-[80px]">
                      <div className="w-8 flex gap-1 flex-col">
                        <span>
                          {index === 0
                            ? 'Start'
                            : item.arrivalTime === ''
                              ? '-'
                              : formatDate(item.arrivalTime, 'time')}
                        </span>

                        <div>
                          {index === 0 ? (
                            '-'
                          ) : item.in.time === '' ? (
                            <div
                              className="rounded-md text-[9px] text-center bg-green-500  w-8 h-fit cursor-pointer"
                              onClick={() =>
                                stageIn.mutate({
                                  id: data.id,
                                  stageId: item.id,
                                  inData: {
                                    time: new Date().toISOString(),
                                    lat: '40.7128',
                                    lng: '74.0060',
                                  },
                                })
                              }
                            >
                              IN
                            </div>
                          ) : (
                            formatDate(item.in.time, 'time')
                          )}
                        </div>
                      </div>
                      <div className="w-8 flex gap-1 flex-col">
                        <span>
                          {index === data.stages.length - 1
                            ? 'End'
                            : item.departureTime === ''
                              ? '-'
                              : formatDate(item.departureTime, 'time')}
                        </span>
                        <span>
                          {index === data.stages.length - 1 ? (
                            '-'
                          ) : item.out.time === '' ? (
                            <div
                              className="rounded-md text-[9px] bg-red-500 text-white text-center w-8 h-fit cursor-pointer"
                              onClick={() =>
                                stageOut.mutate({
                                  id: data.id,
                                  stageId: item.id,
                                  outData: {
                                    time: new Date().toISOString(),
                                    lat: '40.7128',
                                    lng: '74.0060',
                                  },
                                })
                              }
                            >
                              OUT
                            </div>
                          ) : (
                            formatDate(item.out.time, 'time')
                          )}
                        </span>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </section>
          </ScrollArea>
        </section>
        <ChangeCrew
          open={openCrewChange}
          onOpenChange={setOpenCrewChange}
          crewName={openCrewChangeData?.crewName}
          data={openCrewChangeData}
          closeSheet={setOpen}
          refetch={refetch}
        />
        <DeleteCrew
          open={openCrewDelete}
          onOpenChange={setOpenCrewDelete}
          crewName={openCrewDeleteData?.crewName}
          data={openCrewDeleteData}
          closeSheet={setOpen}
          refetch={refetch}
        />
      </>
    );
  }
}

function CrewEvents({ data }) {
  const baseButtonStyles =
    'rounded-md py-0.5 px-2 text-[10px] w-full text-center items-center';
  return (
    <section className="flex flex-col gap-1 py-2 text-xs">
      <div className="flex bg-[#294D71] w-full px-4 py-2 gap-4 items-center justify-between">
        <div className="w-[70px]">
          {!data?.drivers[0]?.checkIn.time === '' ? (
            <div
              className={cn(baseButtonStyles, 'bg-[#54f864] text-[#0D4A86]')}
            >
              Check in
            </div>
          ) : (
            <div className={cn(baseButtonStyles, 'bg-red-400 text-white')}>
              Check out
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center gap-2">
          <DriverIcon className="size-4" />
          {data?.drivers[0]?.name}
        </div>
        <div className="flex items-center justify-between gap-2">
          {data?.drivers[0]?.checkIn.time === ''
            ? '-'
            : data?.drivers[0]?.checkIn.time}
        </div>
      </div>
      {data?.drivers[1] && (
        <div className="flex bg-[#294D71] w-full px-4 py-2 gap-4 items-center justify-between">
          <div className="w-[70px]">
            {data?.drivers[1]?.checkIn.time === '' ? (
              <div
                className={cn(baseButtonStyles, 'bg-[#54f864] text-[#0D4A86]')}
              >
                Check in
              </div>
            ) : (
              <div className={cn(baseButtonStyles, 'bg-red-400 text-white')}>
                Check out
              </div>
            )}
          </div>
          <div className="flex-1 flex items-center gap-2">
            <DriverIcon className="size-4" />
            {data?.drivers[1]?.name}
          </div>
          <div className="flex items-center justify-between gap-2">
            {data?.drivers[1]?.checkIn.time === ''
              ? '-'
              : data?.drivers[1]?.checkIn.time}
          </div>
        </div>
      )}
      <div className="flex bg-[#294D71] w-full px-4 py-2 gap-4 items-center justify-between">
        <div className="w-[70px]">
          {data?.conductor?.checkIn.time === '' ? (
            <div
              className={cn(baseButtonStyles, 'bg-[#54f864] text-[#0D4A86]')}
            >
              Check in
            </div>
          ) : (
            <div className={cn(baseButtonStyles, 'bg-red-400 text-white')}>
              Check out
            </div>
          )}
        </div>
        <div className="flex-1 flex items-center gap-2">
          <CondutorIcon className="size-4" />
          {data?.conductor?.name}
        </div>
        <div className="flex items-center justify-between gap-2">
          {data?.conductor?.checkIn.time === ''
            ? '-'
            : data?.conductor?.checkIn.time}
        </div>
      </div>
    </section>
  );
}

function ChangeCrew({
  open,
  onOpenChange,
  crewName = 'Driver',
  data,
  closeSheet,
  refetch,
}) {
  const [crewData, setCrewData] = useState(null);

  const fetchDrivers = async (inputValue) => {
    const limit = 15;
    const response = await apiService.get(`${APIS.DRIVER_CONDUCTOR}`, {
      params: {
        limit,
        page: 0,
        search: inputValue || null,
        sortBy: 'name',
        order: 'asc',
        staffType: 'Driver',
      },
    });

    const DRIVER = response.data.list.map((d) => ({
      value: d._id,
      label: d.name.english + ' (' + d.loginMobile + ')',
    }));

    return {
      results: DRIVER,
      nextPage: false,
    };
  };

  const fetchConductors = async (inputValue) => {
    const limit = 15;
    const response = await apiService.get(`${APIS.DRIVER_CONDUCTOR}`, {
      params: {
        limit,
        page: 0,
        search: inputValue || null,
        sortBy: 'name',
        order: 'asc',
        staffType: 'Conductor',
      },
    });

    const DRIVER = response.data.list.map((d) => ({
      value: d._id,
      label: d.name.english + ' (' + d.loginMobile + ')',
    }));

    return {
      results: DRIVER,
      nextPage: false,
    };
  };

  const updateCrew = useMutation({
    queryKeys: ['updateCrew'],
    mutationFn: async (data) => {
      console.log(data, crewData);
      await apiService.patch(
        `${APIS.DISPATCH}/update/${data.id}`,
        {
          index: data.index,
          crew: data.crew,
        },
        {
          params: {
            type:
              crewName === 'Driver'
                ? 'changedriver'
                : crewName === 'Conductor'
                  ? 'changeconductor'
                  : '',
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      onOpenChange(false);
      toast.success(
        `${crewName} ${crewName === 'Driver' ? data.index + 1 : ''} updated successfully`
      );
      closeSheet(false);
      refetch();
    },
    onError: (error) => {
      toast.error(
        `Failed to update ${crewName} ${crewName === 'Driver' ? data.index + 1 : ''}. ${error}, please try again`
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Update{' '}
            {`${crewName} ${crewName === 'Driver' ? data.index + 1 : ''}`}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to update{' '}
            {`${crewName} ${crewName === 'Driver' ? data.index + 1 : ''}`} ?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <CustomSelect
            name={`${crewName} crew`}
            label={`${crewName} ${crewName === 'Driver' ? data.index + 1 : ''}`}
            fetchData={
              crewName === 'Driver'
                ? fetchDrivers
                : crewName === 'Conductor' && fetchConductors
            }
            selectProps={{
              placeholder: 'Search...',
              isClearable: true,
            }}
            onChange={(value) => {
              setCrewData(value);
              data.crew = value.value;
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              if (crewData === null) {
                return toast.error(
                  `Please select ${crewName} ${crewName === 'Driver' ? data.index + 1 : ''}`
                );
              }
              updateCrew.mutate(data);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteCrew({
  open,
  onOpenChange,
  crewName = 'Driver',
  data,
  closeSheet,
  refetch,
}) {
  const deleteCrew = useMutation({
    queryKeys: ['updateCrew'],
    mutationFn: async (data) => {
      await apiService.patch(
        `${APIS.DISPATCH}/update/${data.id}`,
        {
          index: data.index,
        },
        {
          params: {
            type:
              crewName === 'Driver'
                ? 'deletedriver'
                : crewName === 'Conductor'
                  ? 'deleteconductor'
                  : '',
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      onOpenChange(false);
      toast.success(
        `${crewName} ${crewName === 'Driver' ? data.index + 1 : ''} deleted successfully`
      );
      closeSheet(false);
      refetch();
    },
    onError: (error) => {
      toast.error(
        `Failed to delete ${crewName} ${crewName === 'Driver' ? data.index + 1 : ''}. ${error}, please try again`
      );
    },
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Delete&nbsp;
            {`${crewName} ${crewName === 'Driver' ? data.index + 1 : ''}`}
          </DialogTitle>
          <DialogDescription>
            If you delete this, the bus status will be change.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              deleteCrew.mutate(data);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import apiService from '@/lib/apiService';
import { formatDate } from '@/utils/dateHelper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useContext, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { XIcon } from 'lucide-react';
import { DaysPicker } from '@/pages/dms/TimeTable/AddEditTimeTable/ServiceSection';
import { DateInput } from '@/pages/dms/TimeTable/AddEditTimeTable/DateTimeInput';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EyeIcon } from 'lucide-react';
import { EllipsisIcon } from 'lucide-react';
import { ShieldMinusIcon } from 'lucide-react';
import { ShieldPlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

function cronToTime(cronExpression) {
  // Split the cron expression by spaces
  const [minutes, hours] = cronExpression.split(' ');

  // Ensure hours and minutes are in "00" format
  const formattedHours = hours.padStart(2, '0');
  const formattedMinutes = minutes.padStart(2, '0');

  // Return the time in "HH:mm" format
  return `${formattedHours}:${formattedMinutes}`;
}

export default function CitizenNotificationPage() {
  const [addCron, setAddCron] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const headButtons = [
    {
      label: 'Add Cron',
      children: <Button onClick={() => setAddCron(true)}>+ Add Cron</Button>,
    },
  ];
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('Citizen Notification Page');
  }, []);

  const columns = [
    {
      field: 'jobName',
      headerName: 'Job Name',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            setOpenSheet(true);
            setSelectedData(params.row);
          }}
        >
          {' '}
          {params.row?.jobName}
        </div>
      ),
    },
    {
      field: 'schedule',
      headerName: 'Schedule',
      headerClassName: 'super-app-theme--header',
      width: 100,
      renderCell: (params) => cronToTime(params.row?.schedule),
    },
    {
      field: 'timeLeftUntilNextRun',
      headerName: 'Time Left Until Next Run',
      headerClassName: 'super-app-theme--header',
      width: 250,
      renderCell: (params) =>
        params.row?.timeLeftUntilNextRun ? (
          <CountdownTimer initialTime={params.row?.timeLeftUntilNextRun} />
        ) : (
          'Inactive'
        ),
    },

    {
      field: 'lastRun',
      headerName: 'Last Run',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) =>
        params.row?.lastRun ? formatDate(params.row?.lastRun) : '-',
    },
    {
      field: 'lastSuccess',
      headerName: 'Last Success',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) =>
        params.row?.lastSuccess ? formatDate(params.row?.lastSuccess) : '-',
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => (
        <Badge variant={params.row?.isActive ? 'default' : 'destructive'}>
          {params.row?.isActive ? 'Activate' : 'Deactivate'}
        </Badge>
      ),
    },
    {
      field: 'threedot',
      headerName: 'Action',
      headerClassName: 'super-app-theme--header hide-img-bordersvg',
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="icon" className="group">
                <EllipsisIcon className="text-blue-primary-200 group-hover:text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedData(params.row);
                  setOpenSheet(true);
                }}
              >
                <EyeIcon className="size-4 mr-2" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (params.row.isActive) {
                    apiService
                      .post(`/crons/${params.row._id}`, {
                        isActive: false,
                      })
                      .then(() => {
                        toast.success('Cron deactivated successfully');
                      });
                  } else {
                    apiService
                      .post(`/crons/${params.row._id}`, {
                        isActive: true,
                      })
                      .then(() => {
                        toast.success('Cron activated successfully');
                      });
                  }
                }}
              >
                {params.row.isActive ? (
                  <>
                    <ShieldMinusIcon className="size-4 mr-2" />
                    <span>Deactivate</span>
                  </>
                ) : (
                  <>
                    <ShieldPlusIcon className="size-4 mr-2" />
                    <span>Activate</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const fetchRoutes = async ({ page, pageSize, search, sortBy, order }) => {
    const response = await apiService.get(`/crons`, {
      params: {
        limit: pageSize,
        page: page + 1,
        search,
        sortBy,
        order,
      },
    });
    return {
      data: response.data.jobs.map((row) => ({ ...row, id: row._id })),
      totalCount: response.data.totalCount || 0,
    };
  };

  return (
    <>
      <PaginatedTableView
        queryKey="citizen-notification"
        queryFn={fetchRoutes}
        columns={columns}
        headButtons={headButtons}
        pageName="Citizen Notification Cron"
        tabs={[{ label: 'All', value: 'all' }]}
      />
      <AddCron open={addCron} onOpenChange={setAddCron} />
      <ViewCron
        open={openSheet}
        onOpenChange={setOpenSheet}
        data={selectedData}
      />
    </>
  );
}

function AddCron({ open, onOpenChange }) {
  const [headers, setHeaders] = useState([]);
  const [formState, setFormState] = useState({
    jobName: '',
    scheduleType: '',
    time: '',
    dayOfWeek: {
      M: false,
      T1: false,
      W: false,
      T2: false,
      F: false,
      S1: false,
      S2: false,
    },
    dayOfMonth: '',
    date: '',
    minutesInterval: '',
    customCron: '',
    apiEndpoint:
      'https://erp.sugamyatra.up.in/api/v1/citizen-user/notify/notify-all-guests',
    method: 'post',
    requestDataTitle: '',
    requestDataMessage: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id, value) => {
    setFormState({ ...formState, [id]: value });
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
  };

  const updateHeader = (index, field, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  const handleDaysChange = (idx, key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = () => {
    // Validate form
    const errors = [];

    // Check if job name is provided
    if (!formState.jobName) {
      errors.push('Job name is required.');
    }

    // Check if API endpoint is provided
    if (!formState.apiEndpoint) {
      errors.push('API endpoint is required.');
    }

    // Check if method is selected
    if (!formState.method) {
      errors.push('HTTP method is required.');
    }

    // Check if time is provided based on the schedule type
    if (
      ['daily', 'weekly', 'monthly', 'yearly'].includes(
        formState.scheduleType
      ) &&
      !formState.time
    ) {
      errors.push(
        'Time is required for daily, weekly, monthly, and yearly schedules.'
      );
    }

    // Check if dayOfWeek is provided for weekly schedule
    if (
      formState.scheduleType === 'weekly' &&
      !Object.values(formState.dayOfWeek).some((value) => value)
    ) {
      errors.push('At least one day of the week must be selected.');
    }

    // Show error messages if validation fails
    if (errors.length > 0) {
      errors.reverse().forEach((error) => toast.error(error));
      onOpenChange(false);
      // remove form state
      setFormState({
        jobName: '',
        scheduleType: '',
        time: '',
        dayOfWeek: {
          M: false,
          T1: false,
          W: false,
          T2: false,
          F: false,
          S1: false,
          S2: false,
        },
        dayOfMonth: '',
        date: '',
        minutesInterval: '',
        customCron: '',
        apiEndpoint: '',
        method: 'get',
        requestDataTitle: '',
        requestDataMessage: '',
      });
      return; // Stop execution if there are validation errors
    }

    // Prepare the request data
    const requestData = {
      title: formState.requestDataTitle,
      message: formState.requestDataMessage,
      data: {}, // Add any additional data you may need here
    };

    // Construct the job configuration object based on the form state
    const jobConfig = {
      jobName: formState.jobName,
      scheduleType: formState.scheduleType,
      apiEndpoint: formState.apiEndpoint,
      method: formState.method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json', // You can customize this based on your headers state
      },
      requestData: requestData,
    };

    // Add additional properties based on the schedule type
    if (formState.scheduleType === 'every-minute') {
      jobConfig.scheduleType = 'every-minute';
    } else if (formState.scheduleType === 'hourly') {
      jobConfig.scheduleType = 'hourly';
    } else if (formState.scheduleType === 'daily') {
      jobConfig.time = formState.time;
    } else if (formState.scheduleType === 'weekly') {
      jobConfig.time = formState.time;
      jobConfig.dayOfWeek = Object.entries(formState.dayOfWeek)
        .filter(([_, value]) => value) // Filter only selected days
        .map(([key]) => {
          switch (key) {
            case 'M':
              return 'monday';
            case 'T1':
              return 'tuesday'; // Assuming T1 is Tuesday
            case 'W':
              return 'wednesday';
            case 'T2':
              return 'thursday'; // Assuming T2 is Thursday
            case 'F':
              return 'friday';
            case 'S1':
              return 'saturday'; // Assuming S1 is Saturday
            case 'S2':
              return 'sunday'; // Assuming S2 is Sunday
            default:
              return null;
          }
        })
        .filter((day) => day); // Remove any null values
    } else if (formState.scheduleType === 'monthly') {
      jobConfig.time = formState.time;
      jobConfig.dayOfMonth = formState.dayOfMonth;
    } else if (formState.scheduleType === 'yearly') {
      jobConfig.time = formState.time;
      jobConfig.date = formState.date;
    } else if (formState.scheduleType === 'every-x-minutes') {
      jobConfig.minutesInterval = formState.minutesInterval;
    } else if (formState.scheduleType === 'custom') {
      jobConfig.customCron = formState.customCron;
    }

    apiService.post('/crons', jobConfig).then((response) => {
      toast.success(response.message);
      onOpenChange(false);
      setFormState({
        jobName: '',
        scheduleType: '',
        time: '',
        dayOfWeek: {
          M: false,
          T1: false,
          W: false,
          T2: false,
          F: false,
          S1: false,
          S2: false,
        },
        dayOfMonth: '',
        date: '',
        minutesInterval: '',
        customCron: '',
        apiEndpoint: '',
        method: 'get',
        requestDataTitle: '',
        requestDataMessage: '',
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Scheduled Job</DialogTitle>
          <DialogDescription>
            Configure your scheduled job to run automatically.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 w-full">
          <div className="grid gap-4 py-4 px-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="jobName">Job Name</Label>
              <Input
                id="jobName"
                placeholder="Enter job name"
                value={formState.jobName}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="scheduleType">Schedule Type</Label>
              <Select
                id="scheduleType"
                value={formState.scheduleType}
                onValueChange={(value) =>
                  handleSelectChange('scheduleType', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="every-minute">Every Minute</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="every-x-minutes">
                    Every X Minutes
                  </SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(formState.scheduleType === 'daily' ||
              formState.scheduleType === 'weekly' ||
              formState.scheduleType === 'monthly' ||
              formState.scheduleType === 'yearly') && (
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  placeholder="Enter time"
                  value={formState.time}
                  onChange={handleChange}
                />
              </div>
            )}
            {formState.scheduleType === 'weekly' && (
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="dayOfWeek">Day of Week</Label>
                <DaysPicker
                  days={formState.dayOfWeek}
                  handleDays={handleDaysChange}
                  idx={0}
                  label={null}
                />
              </div>
            )}
            {formState.scheduleType === 'monthly' && (
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="dayOfMonth">Day of Month</Label>
                <DateInput
                  value={formState.dayOfMonth}
                  name="dayOfMonth"
                  id="dayOfMonth"
                  callback={(value) =>
                    handleChange({ target: { id: 'dayOfMonth', value } })
                  }
                  onChange={handleChange}
                  useFormik={false}
                  placeholder="Enter day of month"
                />
              </div>
            )}
            {formState.scheduleType === 'yearly' && (
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  placeholder="MM-DD"
                  value={formState.date}
                  onChange={handleChange}
                />
              </div>
            )}
            {formState.scheduleType === 'every-x-minutes' && (
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="minutesInterval">Minutes Interval</Label>
                <Input
                  id="minutesInterval"
                  placeholder="Enter interval in minutes"
                  value={formState.minutesInterval}
                  onChange={handleChange}
                />
              </div>
            )}
            {formState.scheduleType === 'custom' && (
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="customCron">Custom Cron Expression</Label>
                <Input
                  id="customCron"
                  placeholder="* * * * *"
                  value={formState.customCron}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="apiEndpoint">API Endpoint</Label>
              <Input
                id="apiEndpoint"
                placeholder="Enter API endpoint"
                value={formState.apiEndpoint}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="method">Method</Label>
              <Select
                id="method"
                value={formState.method}
                onValueChange={(value) => handleSelectChange('method', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="get">GET</SelectItem>
                  <SelectItem value="post">POST</SelectItem>
                  <SelectItem value="put">PUT</SelectItem>
                  <SelectItem value="delete">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4">
              <Label>Headers</Label>
              <div className="grid gap-2">
                {headers.map((header, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_1fr_auto] items-center gap-4"
                  >
                    <Input
                      placeholder="Key"
                      value={header.key}
                      onChange={(e) =>
                        updateHeader(index, 'key', e.target.value)
                      }
                    />
                    <Input
                      placeholder="Value"
                      value={header.value}
                      onChange={(e) =>
                        updateHeader(index, 'value', e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHeader(index)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addHeader}>
                  Add Header
                </Button>
              </div>
            </div>
            {formState.method !== 'get' && (
              <div className="grid gap-4">
                <Label>Request Data</Label>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="requestDataTitle">Title</Label>
                    <Input
                      id="requestDataTitle"
                      placeholder="Enter title"
                      value={formState.requestDataTitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 items-start gap-4">
                    <Label htmlFor="requestDataMessage">Message</Label>
                    <Textarea
                      id="requestDataMessage"
                      placeholder="Enter message"
                      rows={3}
                      value={formState.requestDataMessage}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function ViewCron({ open, onOpenChange, data }) {
  if (data === null) {
    return null;
  }

  const LogItem = ({ runAt, status, response }) => {
    return (
      <div className="p-4 bg-white shadow-md rounded-md border">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-900">
            <strong>Run At:</strong> {formatDate(runAt)}
          </div>
          <div
            className={`text-sm font-semibold ${status === 'Success' ? 'text-green-500' : 'text-red-500'}`}
          >
            {status}
          </div>
        </div>
        <div className="text-sm text-gray-800">
          <strong>Response Code:</strong> {response.code}
        </div>
        <div className="text-sm text-gray-800">
          <strong>Response Status:</strong> {response.status ? 'True' : 'False'}
        </div>
        <div className="text-sm text-gray-800">
          <strong>Message:</strong> {response.message}
        </div>
      </div>
    );
  };

  const LogsList = ({ logs }) => {
    return (
      <div className="w-full space-y-4">
        {logs.map((log) => (
          <LogItem
            key={log._id}
            runAt={log.runAt}
            status={log.status}
            response={log.response}
          />
        ))}
      </div>
    );
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold mx-auto">
            {data.jobName}
          </SheetTitle>
          <SheetDescription>
            <div className="grid grid-cols-1 gap-4 text-center">
              <div>
                {data.timeLeftUntilNextRun ? (
                  <CountdownTimer
                    className="text-4xl font-bold"
                    initialTime={data.timeLeftUntilNextRun}
                  />
                ) : (
                  <div className="text-4xl font-bold">Inactive</div>
                )}

                <p className="text-sm text-gray-500">
                  Time Left Until Next Run
                </p>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-170px)] w-full mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <p className="text-sm font-bold">Status</p>
              <div>
                <Badge variant="default">{data.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <p className="text-sm font-bold">Schedule</p>
              <p className="text-sm text-gray-500">
                {cronToTime(data.schedule)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <p className="text-sm font-bold">Last Run</p>
              <p className="text-sm text-gray-500">
                {data.lastRun ? formatDate(data.lastRun) : '-'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <p className="text-sm font-bold">Last Success</p>
              <p className="text-sm text-gray-500">
                {' '}
                {data.lastSuccess ? formatDate(data.lastSuccess) : '-'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <p className="text-sm font-bold">Method</p>
              <p className="text-sm text-gray-500">{data.method}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 items-start">
              <p className="text-sm font-bold">API Endpoint</p>
              <div className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-break-spaces ">
                {data.apiEndpoint}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <p className="text-sm font-bold">Request Data</p>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <p className="text-sm font-semibold">Title</p>
              <p className="text-sm text-gray-500">{data.requestData.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 items-start">
              <p className="text-sm font-semibold">Message</p>
              <p className="text-sm text-gray-500">
                {data.requestData.message}
              </p>
            </div>
            {data.headers && data.headers.length && (
              <>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <p className="text-sm font-bold">Headers</p>
                </div>
                {data.headers.map((header, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 items-center"
                  >
                    <p className="text-sm text-gray-500">{header.key}</p>
                    <p className="text-sm text-gray-500">{header.value}</p>
                  </div>
                ))}
              </>
            )}

            {data.log && data.log.length != 0 && (
              <>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <p className="text-sm font-bold">Log</p>
                </div>
                <LogsList logs={data.log} />
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

const convertToSeconds = (timeString) => {
  const timeParts = timeString.match(/(\d+)d (\d+)h (\d+)m (\d+)s/);
  const days = parseInt(timeParts[1], 10);
  const hours = parseInt(timeParts[2], 10);
  const minutes = parseInt(timeParts[3], 10);
  const seconds = parseInt(timeParts[4], 10); // Change here to parseInt to handle whole seconds only

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
};

const CountdownTimer = ({ className, initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(convertToSeconds(initialTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return <p className={className}>{formatTime(timeLeft)}</p>;
};

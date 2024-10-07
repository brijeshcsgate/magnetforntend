import { Button } from '@/components/ui/button';
import {
  EllipsisIcon,
  EyeIcon,
  PencilIcon,
  TicketSlashIcon,
  UserRoundCheck,
  UserRoundX,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import apiService from '@/lib/apiService';
import { APIS } from '@/constants/api.constant';
import { postApi } from '@/services/method';
import { ROUTES } from '@/constants/route.constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PaginatedTableView from '@/components/layouts/PaginatedTableView';
import DataCharectersTooltip from '@/components/ui/DataCharectersTooltip';
import { useContext, useEffect, useState } from 'react';
import { patchApi } from '@/services/method';
import { Tooltip } from '@mui/material';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';





const columns = [
  { field: 'name', headerName: 'name', width: 170 },


  { field: 'mobile', headerName: 'Contact', width: 170 },

  { field: 'industry', headerName: 'Industry', width: 170 },

  { field: 'address', headerName: 'Location', width: 170 },

  { field: 'name', headerName: 'User', width: 170 },

  { field: 'userType', headerName: 'Type', width: 170 },

  { field: '', headerName: 'Action', width: 170 },

]











export default function ResellCompany() {


  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('Reseller/Company');
  }, []);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const HEAD_BUTTONS = [
    {
      label: 'Add User',
      children: (
        <Button onClick={() => navigate(ROUTES.ADD_USER)}>Invite</Button>
      ),
    },
    {
      label: 'More',
      children: (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" className="group">
              <EllipsisIcon className="text-blue-primary-200 group-hover:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Export CSV</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Fetch data dynamically from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`${APIS.COMP_RESEL}`, {
        });; // Replace with your API endpoint
        setRows(
          response.result.map((item) => ({
            // Assuming `item` is an object, you can restructure it here
            id: item._id,                // Assign a new field name if needed
            name: item.name,
            mobile: item.mobile,
            industry: item.industry,
            address: item.address,
            name: item.name,
            userType: item.userType, // Map the existing fields
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <PaginatedTableView
      // queryKey={`routes ${userApiData}`}
      // queryFn={fetchRoutes}
      // columns={columns}
      // pageName="Users"
      headButtons={HEAD_BUTTONS}
      // LIST_OF_FILTERS={LIST_OF_FILTERS}
      // tabs={[{ label: 'All', value: 'all' }]}
      columns_data={columns}
      rows_data={rows}
      // pageSizeOptions_data={loading}
      // loading={[5, 10, 20]}
      checkboxSelection={true}

    />
  );
}

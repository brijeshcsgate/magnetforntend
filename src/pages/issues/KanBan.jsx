/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  critcalIssue,
  highIssue,
  lowIssue,
  mediumIssue,
  notFoundIssue,
  seperator,
  spearker,
  spearkerWorking,
} from '@/assets/Icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import useStore from '@/store/userStore';
import { stringToColor } from '@/utils/Workshop.Issues.utils/issues.helper';
import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Skeleton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import useTextToSpeech from './TextToSpeechHook';
import apiService from '@/lib/apiService';
import { APIS } from '@/constants/api.constant';
import { toast } from 'sonner';
import { patchApi } from '@/services/method';

const KanbanBoard = ({ tasks }) => {
  const { user } = useStore();
  const [currentTasks, setCurrentTasks] = useState({});
  const [speakingTasks, setSpeakingTasks] = useState({});
  const [allPriorities, setAllPriorities] = useState([]);
  const { speak } = useTextToSpeech();
  const [loading, setLoading] = useState(true);

  const colors = {
    Open: '#FF6F31',
    Overdue: '#F6BF32',
    Resolved: '#4D9CF9',
    Closed: '#58D20E',
  };

  useEffect(() => {
    setTimeout(() => {
      setCurrentTasks(tasks);
      setLoading(false);
    }, 2000);
  }, [tasks]);

  const getAllPriorities = async () => {
    try {
      const response = await apiService.get(APIS.PRIORITY);
      setAllPriorities(response?.data?.list);
    } catch (error) {
      console.error('Error fetching priorities:', error);
      toast.error('Failed to fetch priorities');
    }
  };

  useEffect(() => {
    getAllPriorities();
    setCurrentTasks(tasks);
  }, [tasks]);

  const handleSpeak = async (taskId, text) => {
    setSpeakingTasks((prev) => ({ ...prev, [taskId]: true }));
    await speak(text);
    setSpeakingTasks((prev) => ({ ...prev, [taskId]: false }));
  };

  const updateTaskPriority = async (task, newPriorityId) => {
    const payload = {
      issueUpdatedBy: user._id,
      priorityId: newPriorityId,
      source: 'updateIssue',
    };
    try {
      await patchApi(APIS.ISSUES, task._id, payload);
      toast.success("Issue's priority updated successfully");
      // Update the task in the current state
      setCurrentTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        Object.keys(updatedTasks).forEach((column) => {
          updatedTasks[column] = updatedTasks[column].map((t) =>
            t._id === task._id ? { ...t, priorityId: newPriorityId } : t
          );
        });
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error updating priority:', error);
      toast.error('Failed to update priority');
    }
  };

  const renderPriority = (priorityId) => {
    const priority = allPriorities.find((p) => p._id === priorityId);
    if (!priority) return null;

    let statusIcon;
    switch (priority.name) {
      case 'Critical':
        statusIcon = critcalIssue({});
        break;
      case 'High':
        statusIcon = highIssue({});
        break;
      case 'Medium':
        statusIcon = mediumIssue({});
        break;
      case 'Low':
        statusIcon = lowIssue({});
        break;
      default:
        statusIcon = notFoundIssue({});
    }

    return (
      <div className="flex gap-4">
        {statusIcon} <div className="heading-500-12">{priority.name}</div>
      </div>
    );
  };
  const handleDragStart = (e, task, column) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
    e.dataTransfer.setData('column', column);
  };
  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
  const updateTaskStatus = (task, newStatus) => {
    console.log(task, newStatus);
    let payload = {
      issueUpdatedBy: user._id,
      issueStatus: newStatus,
      source: 'updateIssueStatus',
    };
    payload._id = task._id;
    patchApi(APIS.ISSUES, task._id, payload).then(() => {
      toast.success("Issue's status updated successfully");
    });
  };
  // const updateTaskPriority = (task, newStatus) => {
  //   // console.log(task, newStatus);
  //   let payload = {
  //     issueUpdatedBy: user._id,
  //     priorityId: newStatus,
  //     source: 'updateIssue',
  //   };
  //   payload._id = task._id;
  //   patchApi(APIS.ISSUES, task._id, payload).then(() => {
  //     toast.success("Issue's priority updated successfully");
  //   });
  // };

  const handleDrop = (e, column) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task'));
    const fromColumn = e.dataTransfer.getData('column');

    if (
      fromColumn === column ||
      !task ||
      !fromColumn ||
      !currentTasks[fromColumn]
    )
      return;

    setCurrentTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[fromColumn] = updatedTasks[fromColumn].filter(
        (t) => t._id !== task._id
      );
      updatedTasks[column] = [...(updatedTasks[column] || []), task];
      updateTaskStatus(task, column);
      return updatedTasks;
    });
  };

  // const renderPriority = (params) => {
  //   let statusText;
  //   let statusIcon;

  //   switch (params) {
  //     case 'Critical':
  //       statusText = 'Critical';
  //       statusIcon = critcalIssue({});
  //       break;
  //     case 'High':
  //       statusText = 'High';
  //       statusIcon = highIssue({});
  //       break;
  //     case 'Medium':
  //       statusText = 'Medium';
  //       statusIcon = mediumIssue({});
  //       break;
  //     case 'Low':
  //       statusText = 'Low';
  //       statusIcon = lowIssue({});
  //       break;
  //     case 'No Priority':
  //       statusText = 'No Priority';
  //       statusIcon = notFoundIssue({});
  //       break;
  //     default:
  //       statusIcon = <></>;
  //   }
  //   return (
  //     <div className="flex gap-4">
  //       {statusIcon} <div className="heading-500-12">{statusText}</div>
  //     </div>
  //   );
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex space-x-4  w-[calc(100vw-90px-72px)] overflow-hidden overflow-x-scroll">
        {Object.keys(currentTasks).map((column, idx) => (
          <div
            key={column}
            className="flex-none w-80 min-w-[250px] backdrop-grayscale bg-[#F7F7F7] shadow-md rounded-sm "
            onDrop={(e) => handleDrop(e, column)}
            onDragOver={handleDragOver}
          >
            <h2
              className="text-lg font-semibold flex justify-between items-center p-2 rounded-t-md  h-[63px]"
              style={{ backgroundColor: colors[column], color: 'White' }}
            >
              {column}
              <span
                className="bg-gray-300 text-gray-800 p-1 rounded-md text-sm w-[52px] text-center"
                style={{ backgroundColor: 'white', color: colors[column] }}
              >
                {currentTasks[column]?.length || 0}
              </span>
            </h2>
            {/* Show skeleton loader if loading */}
            <div className="p-3">
              {loading ? (
                <div className="flex flex-col space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        padding: '16px',
                        borderRadius: '0.25rem',
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
                        marginBottom: '16px',
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={20}
                        animation="wave"
                        sx={{
                          bgcolor: 'grey.100',
                          borderRadius: '4px',
                          marginBottom: '8px',
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width="60%"
                        height={15}
                        animation="wave"
                        sx={{
                          bgcolor: 'grey.100',
                          borderRadius: '4px',
                          marginBottom: '8px',
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width="40%"
                        height={15}
                        animation="wave"
                        sx={{
                          bgcolor: 'grey.100',
                          borderRadius: '4px',
                          marginBottom: '16px',
                        }}
                      />

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div className="flex items-center">
                          <Skeleton
                            variant="circular"
                            width={25}
                            height={25}
                            animation="wave"
                            sx={{
                              bgcolor: 'grey.100',
                              marginRight: '8px',
                            }}
                          />
                          <Skeleton
                            variant="rectangular"
                            width={80}
                            height={20}
                            animation="wave"
                            sx={{
                              bgcolor: 'grey.100',
                              borderRadius: '4px',
                            }}
                          />
                        </div>

                        <Skeleton
                          variant="circular"
                          width={30}
                          height={30}
                          animation="wave"
                          sx={{
                            bgcolor: 'grey.100',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ScrollArea
                  className="h-[calc(100vh-280px)] w-full"
                  key={column}
                >
                  {currentTasks[column]?.map((task) => (
                    <>
                      <Link
                        to={`/issues/preview/${task._id}`}
                        state={{ id: task._id }}
                      >
                        <div
                          key={task._id}
                          className="px-4 py-2 mb-3 cursor-move shadow-sm bg-white rounded-sm border border-y-slate-200"
                          draggable
                          onDragStart={(e) => handleDragStart(e, task, column)}
                        >
                          <div className="flex justify-between">
                            <div className="heading-700-15">
                              {task.asset ?? '-'}
                            </div>{' '}
                            {task.description && (
                              <div
                                key={task._id}
                                className="cursor-pointer"
                                onClick={() =>
                                  handleSpeak(task._id, task.description)
                                }
                                disabled={speakingTasks[task._id]} // Disable if the task is speaking
                              >
                                {speakingTasks[task._id]
                                  ? spearkerWorking({})
                                  : spearker({})}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="heading-500-12">
                              {task.issueSubCategoryId ?? '-'}
                            </div>{' '}
                          </div>
                          <div>
                            <div className="heading-500-12">
                              {task.issueCategoryId ?? '-'}
                            </div>{' '}
                          </div>
                          <div>
                            <div className="heading-400-10">
                              <Tooltip title={task.description ?? '-'}>
                                {truncateText(task.description, 100)}
                              </Tooltip>
                            </div>{' '}
                          </div>
                          {seperator({})}
                          <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger className="p-0">
                                  <Button
                                    variant="none"
                                    className="group p-1 rounded-md hover:bg-gray-100 border-none"
                                  >
                                    <div className="flex gap-3 items-center justify-evenly">
                                      {renderPriority(task.priorityId)}
                                      <span>
                                        <ArrowDropDown height={'14px'} />
                                      </span>
                                    </div>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {allPriorities.map((priority) => (
                                    <DropdownMenuItem
                                      key={priority._id}
                                      onClick={() =>
                                        updateTaskPriority(task, priority._id)
                                      }
                                    >
                                      {renderPriority(priority._id)}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <div>
                                <Tooltip title={task.assignedTo}>
                                  <Avatar
                                    sx={{
                                      bgcolor: stringToColor(
                                        task.assignedTo ?? '-'
                                      ),
                                      width: 28,
                                      height: 28,
                                    }}
                                    alt={task.assignedTo}
                                    src="/static/images/avatar/1.jpg"
                                  />
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  ))}
                </ScrollArea>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default KanbanBoard;

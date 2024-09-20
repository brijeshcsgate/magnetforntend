import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const CustomTimeline = ({ items }) => {
  return (
    <Timeline sx={{ padding: 0 }}>
      {items.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ flex: 0.2, padding: 1 }}
            color="textSecondary"
          >
            {item.time}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                backgroundColor: item.dotColor || "primary",
              }}
              color={"primary"}
            />
            {index < items.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent sx={{ flex: 1, paddingY: 1 }}>
            {item.content}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default CustomTimeline;

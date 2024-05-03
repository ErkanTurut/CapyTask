import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BuddyCommentProps {}

export default async function BuddyComment({}: BuddyCommentProps) {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader>
        <CardTitle>Buddy Insights</CardTitle>
      </CardHeader>
      <CardContent className="text-pretty text-sm">
        The work order is currently in progress with the status marked as "In
        Progress." As of the latest update on May 3, 2024, routine maintenance
        has been completed, and repair work is underway. One task remains open,
        indicating a pending activity. The assigned team is actively working on
        resolving the issues, and the system unit requiring maintenance is
        identified as Model AC-1234. Close monitoring of progress and timely
        resolution of any issues are recommended to ensure smooth completion.
      </CardContent>
      <CardFooter>not this summary</CardFooter>
    </Card>
  );
}

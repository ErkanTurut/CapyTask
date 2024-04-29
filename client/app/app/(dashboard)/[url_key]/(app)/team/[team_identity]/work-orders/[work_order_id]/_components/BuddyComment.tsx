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
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        Hey there! Work Order #123 is currently in progress. Technician John
        Smith is on-site and working hard to resolve the issue. Estimated
        completion is in 2 days.
      </CardContent>
      <CardFooter>not this summary</CardFooter>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import LinkSubmissionForm from "@/components/ui/LinkSubmissionForm";


export default function Home() {
  return (
    <>
      <div className="flex flex-col border-dotted items-center justify-center min-h-screen p-4">
        <Card className="text-gray-600">
          <div className="flex flex-col items-center justify-center w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">Welcome to OnlyLinks...</h1>
            We get it done.
            {/* <LinkSubmissionForm /> */}
          </div>
        </Card>
      </div>

      <div className="flex items-stretch bg-grey-lighter">
        <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
          1
        </div>
        <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
          2
        </div>
        <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
          3
        </div>
      </div>
    </>
  )
}

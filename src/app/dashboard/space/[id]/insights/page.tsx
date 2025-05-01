import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb } from "lucide-react"

export default function InsightsPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Case Insights</h1>
        <p className="text-muted-foreground">AI-generated analysis and key points</p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="opposition">Opposition</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Case Overview</CardTitle>
                <CardDescription>Key facts and timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm">
                    This case involves a contract dispute between Smith and Johnson regarding the delivery of services.
                    The contract was signed on January 15, 2023, and the dispute arose on March 22, 2023, when Johnson
                    failed to deliver the agreed-upon services by the deadline.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Timeline</h4>
                  <ul className="space-y-2">
                    <li className="flex">
                      <div className="w-24 font-medium">Jan 15, 2023</div>
                      <div>Contract signed</div>
                    </li>
                    <li className="flex">
                      <div className="w-24 font-medium">Feb 28, 2023</div>
                      <div>First milestone deadline</div>
                    </li>
                    <li className="flex">
                      <div className="w-24 font-medium">Mar 22, 2023</div>
                      <div>Dispute arose</div>
                    </li>
                    <li className="flex">
                      <div className="w-24 font-medium">Apr 10, 2023</div>
                      <div>Filing date</div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Issues</CardTitle>
                <CardDescription>Main points of contention</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Timeline</p>
                      <p className="text-sm text-muted-foreground">
                        The contract specified a delivery date of February 28, 2023, which was not met.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Quality of Deliverables</p>
                      <p className="text-sm text-muted-foreground">
                        The partial deliverables provided did not meet the specifications outlined in section 2.3 of the
                        contract.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Force Majeure Clause</p>
                      <p className="text-sm text-muted-foreground">
                        Johnson claims that supply chain issues constitute a force majeure event under section 8.2 of
                        the contract.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Payment Terms</p>
                      <p className="text-sm text-muted-foreground">
                        Smith made the initial payment but is withholding the milestone payment due to incomplete
                        delivery.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Supporting Arguments</CardTitle>
              <CardDescription>Key points in favor of our position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="font-medium text-lg mb-2">Contract Language</h3>
                  <p className="text-sm mb-4">
                    The contract clearly states in section 3.1 that "time is of the essence" regarding delivery
                    deadlines, which strengthens our position on the breach of contract claim.
                  </p>
                  <div className="bg-background p-3 rounded border text-sm">
                    <p className="font-medium">Contract Section 3.1:</p>
                    <p className="italic">
                      "Contractor agrees that time is of the essence in the performance of this Agreement, and
                      Contractor's failure to complete the Services by the agreed-upon deadline shall constitute a
                      material breach of this Agreement."
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Key Supporting Points</h3>

                  <div className="flex">
                    <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Payment Compliance</p>
                      <p className="text-sm text-muted-foreground">
                        Smith made all required payments on time as evidenced by bank statements dated January 16, 2023.
                        This demonstrates full compliance with payment obligations.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Communication Records</p>
                      <p className="text-sm text-muted-foreground">
                        Email correspondence from February 15, 2023, shows that Johnson acknowledged the upcoming
                        deadline and confirmed they would meet it, contradicting their later claims.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Force Majeure Limitations</p>
                      <p className="text-sm text-muted-foreground">
                        The force majeure clause specifically excludes "foreseeable supply chain disruptions" which
                        Johnson had knowledge of prior to signing the contract.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Quality Standards</p>
                      <p className="text-sm text-muted-foreground">
                        The deliverables provided failed to meet the quality standards explicitly defined in Appendix A
                        of the contract, as confirmed by independent expert analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opposition">
          <Card>
            <CardHeader>
              <CardTitle>Opposition Arguments</CardTitle>
              <CardDescription>Anticipated counterarguments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="font-medium text-lg mb-2">Potential Defense Strategy</h3>
                  <p className="text-sm">
                    Based on preliminary filings and communications, Johnson is likely to focus on three main arguments
                    to defend their position.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Key Opposition Points</h3>

                  <div className="flex">
                    <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Force Majeure Application</p>
                      <p className="text-sm text-muted-foreground">
                        Johnson will likely argue that global supply chain disruptions constitute an "act beyond
                        reasonable control" as defined in the force majeure clause.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Counter:</span> The clause specifically excludes foreseeable
                        disruptions, and evidence shows Johnson was aware of these issues.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Specification Changes</p>
                      <p className="text-sm text-muted-foreground">
                        They may claim that Smith requested changes to the original specifications, which necessitated
                        additional time not accounted for in the original timeline.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Counter:</span> All change requests were minor and documented
                        through the proper change order process with agreed timelines.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Substantial Performance</p>
                      <p className="text-sm text-muted-foreground">
                        Johnson may argue that they substantially performed the contract by delivering 70% of the
                        required services, which should mitigate damages.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Counter:</span> The contract explicitly requires 100% completion
                        for milestone payments, and the delivered portion had quality issues.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Communication Delays</p>
                      <p className="text-sm text-muted-foreground">
                        They may claim that Smith was slow to respond to critical questions, contributing to the delay.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Counter:</span> Communication logs show all inquiries were
                        answered within the 48-hour window specified in the contract.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

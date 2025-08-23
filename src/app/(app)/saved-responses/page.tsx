import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockSavedResponses } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export default function SavedResponsesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Saved Responses</CardTitle>
                <CardDescription>Review and edit your saved answers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockSavedResponses.map(response => (
                    <div key={response.id} className="border p-4 rounded-lg bg-background">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold">{response.question}</p>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-muted-foreground mt-2 text-sm">{response.answer}</p>
                        <p className="text-xs text-muted-foreground/70 mt-4">Saved on: {response.date}</p>
                    </div>
                ))}
                {mockSavedResponses.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>You haven't saved any responses yet.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

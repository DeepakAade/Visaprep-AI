import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AppointmentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Find Visa Appointments</CardTitle>
                <CardDescription>This feature is coming soon.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                    <p>Soon, you'll be able to get assistance finding earlier visa appointment slots.</p>
                </div>
            </CardContent>
        </Card>
    )
}

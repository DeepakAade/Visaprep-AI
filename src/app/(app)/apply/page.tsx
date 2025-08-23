import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApplyPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Start Your Application</CardTitle>
                <CardDescription>This feature is coming soon.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                    <p>We are working on integrating with official portals to streamline your application process.</p>
                </div>
            </CardContent>
        </Card>
    )
}

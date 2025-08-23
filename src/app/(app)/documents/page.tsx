'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { visaTypes, documentChecklists } from '@/lib/data';

type Document = {
  id: string;
  label: string;
  checked: boolean;
};

type Checklists = {
  [key: string]: Document[];
}

export default function DocumentChecklistPage() {
  const [selectedVisa, setSelectedVisa] = useState<keyof typeof documentChecklists>('f1');
  const [checklists, setChecklists] = useState<Checklists>(documentChecklists);

  const handleCheckChange = (visaType: keyof typeof documentChecklists, docId: string, checked: boolean) => {
    setChecklists(prev => ({
      ...prev,
      [visaType]: prev[visaType].map(doc =>
        doc.id === docId ? { ...doc, checked } : doc
      ),
    }));
  };

  const currentList = checklists[selectedVisa] || [];
  const checkedCount = currentList.filter(doc => doc.checked).length;
  const totalCount = currentList.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle className="font-headline">Document Checklist</CardTitle>
                <CardDescription>Select your visa type to see the required documents.</CardDescription>
            </div>
            <Select onValueChange={(value) => setSelectedVisa(value as keyof typeof documentChecklists)} defaultValue={selectedVisa}>
                <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Select Visa Type" />
                </SelectTrigger>
                <SelectContent>
                    {visaTypes.map((visa) => (
                    <SelectItem key={visa.value} value={visa.value}>
                        {visa.label}
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        {currentList.length > 0 ? (
          <>
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{checkedCount} / {totalCount} documents</span>
              </div>
              <Progress value={progress} />
            </div>
            <div className="space-y-4">
              {currentList.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-3 p-4 rounded-md border bg-secondary/30">
                  <Checkbox
                    id={doc.id}
                    checked={doc.checked}
                    onCheckedChange={(checked) => handleCheckChange(selectedVisa, doc.id, !!checked)}
                  />
                  <Label htmlFor={doc.id} className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {doc.label}
                  </Label>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Please select a visa type to see the checklist.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

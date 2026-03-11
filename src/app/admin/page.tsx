"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AdminPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const exportToCSV = () => {
    if (contacts.length === 0) return;

    const headers = ["Nombre", "Email", "Teléfono", "Mensaje", "Fecha"];
    const csvRows = [
      headers.join(","),
      ...contacts.map(contact => {
        const date = contact.createdAt?.toDate ? contact.createdAt.toDate().toLocaleString() : "";
        return [
          `"${contact.name || ""}"`,
          `"${contact.email || ""}"`,
          `"${contact.phone || ""}"`,
          `"${(contact.message || "").replace(/"/g, '""')}"`,
          `"${date}"`
        ].join(",");
      })
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_carblau_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-headline font-bold text-primary">Panel de Control</h1>
              <p className="text-muted-foreground">Gestión de clientes y leads interesados en Carblau.</p>
            </div>
            <Button 
              onClick={exportToCSV} 
              disabled={contacts.length === 0}
              variant="outline"
              className="border-primary/20 hover:bg-primary/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar a CSV
            </Button>
          </div>

          <Card className="bg-secondary/20 border-white/10 glass-morphism overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-xl font-headline font-bold">Solicitudes Recibidas ({contacts.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-12 text-center text-muted-foreground">
                  Cargando solicitudes...
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-foreground font-bold">Nombre</TableHead>
                        <TableHead className="text-foreground font-bold">Email</TableHead>
                        <TableHead className="text-foreground font-bold">Teléfono</TableHead>
                        <TableHead className="text-foreground font-bold">Mensaje</TableHead>
                        <TableHead className="text-foreground font-bold">Fecha</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id} className="border-white/5 hover:bg-white/5 transition-colors">
                          <TableCell className="font-medium py-4">{contact.name}</TableCell>
                          <TableCell className="py-4">{contact.email}</TableCell>
                          <TableCell className="py-4">{contact.phone}</TableCell>
                          <TableCell className="py-4 max-w-xs">
                            <p className="truncate text-sm" title={contact.message}>
                              {contact.message || "Sin mensaje"}
                            </p>
                          </TableCell>
                          <TableCell className="py-4 text-xs text-muted-foreground">
                            {contact.createdAt?.toDate ? 
                              contact.createdAt.toDate().toLocaleString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : 
                              'Enviando...'}
                          </TableCell>
                        </TableRow>
                      ))}
                      {contacts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                            <div className="flex flex-col items-center space-y-2">
                              <span className="text-4xl">📩</span>
                              <p>No hay solicitudes registradas aún.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
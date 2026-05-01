import React, { useState } from 'react';

export const AdminPanel: React.FC = () => {
  const [driverName, setDriverName] = useState('');
  const [driverId, setDriverId] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!driverId) return;
    
    // Construct the URL that leads to this app with the ref parameter
    const baseUrl = window.location.origin + window.location.pathname;
    // Ensure we handle trailing slashes correctly
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const finalUrl = `${cleanBaseUrl}?ref=${encodeURIComponent(driverId)}`;
    setGeneratedUrl(finalUrl);
  };

  const getQrUrl = (text: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&bgcolor=ffffff`;
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <nav className="bg-blue-900 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl flex items-center gap-2">
            <span>🚖</span> Admin Taxis
          </div>
          <div className="text-xs bg-blue-800 px-3 py-1 rounded-full">
            Panel de Control
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Generator Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-4 text-slate-800 border-b pb-2">Nueva Unidad</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre del Conductor</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Ej. Juan Pérez"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Placa / ID Unidad</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition uppercase font-mono"
                    placeholder="Ej. TAXI-045"
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value.toUpperCase())}
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                >
                  Generar QR
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 text-sm">¿Cómo funciona?</h3>
              <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
                <li>Genera el QR para la unidad.</li>
                <li>Imprime la ficha y pégala en la cabecera del asiento.</li>
                <li>El pasajero escanea y obtiene el 10% de descuento.</li>
                <li>La clínica recibe los datos en Google Sheets y WhatsApp.</li>
                <li><strong>Nota:</strong> Informar al conductor cuando se cierre una venta referida por él.</li>
              </ul>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
              
              {generatedUrl ? (
                <div className="text-center relative z-10 w-full max-w-md">
                  <div className="bg-white p-6 border-4 border-slate-900 rounded-3xl inline-block shadow-2xl mb-6 relative group">
                    <img 
                      src={getQrUrl(generatedUrl)} 
                      alt={`QR para ${driverId}`}
                      className="w-64 h-64 object-contain"
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      Escanea para Descuento
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    <h3 className="text-2xl font-bold text-slate-800">Unidad: {driverId}</h3>
                    <p className="text-slate-500 text-sm font-mono bg-slate-100 py-2 px-4 rounded-lg break-all">
                      {generatedUrl}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => window.print()}
                      className="flex items-center justify-center gap-2 bg-slate-800 text-white py-3 px-6 rounded-xl font-bold hover:bg-slate-900 transition"
                    >
                      <span>🖨️</span> Imprimir Ficha
                    </button>
                    <a 
                      href={generatedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 py-3 px-6 rounded-xl font-bold hover:bg-slate-50 transition"
                    >
                      <span>🔗</span> Probar Link
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center opacity-40">
                  <div className="text-8xl mb-4">🚕</div>
                  <h3 className="text-2xl font-bold text-slate-800">Esperando datos...</h3>
                  <p className="text-slate-500">Ingresa los datos del conductor para generar el material.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
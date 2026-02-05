import { useState, useRef, useEffect } from "react";
import { Send, Menu, X } from "lucide-react";

const doctors = [
  { id: 1, name: "Dr. Abebe", avatar: "https://i.pravatar.cc/40?img=32", specialty: "Cardiologist" },
  { id: 2, name: "Dr. Selam", avatar: "https://i.pravatar.cc/40?img=12", specialty: "Dermatologist" },
  { id: 3, name: "Dr. Hana", avatar: "https://i.pravatar.cc/40?img=44", specialty: "Pediatrician" },
];

export default function UserChatPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const endRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!taRef.current) return;
    taRef.current.style.height = "auto";
    taRef.current.style.height = Math.min(taRef.current.scrollHeight, 80) + "px";
  }, [input]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input.trim() }]);
    setInput("");
  };

  const selectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setMessages([{ from: "doctor", text: `Hello! I am ${doc.name}. How can I help you?` }]);
    setShowSidebar(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">

      {/* SIDEBAR */}
      {selectedDoctor && (
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r transform transition-transform
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} sm:relative sm:translate-x-0 sm:w-1/4 lg:w-1/5 flex flex-col`}
        >
          <div className="h-12 flex items-center px-4 border-b font-semibold">
            Doctors
            <button className="sm:hidden ml-auto" onClick={() => setShowSidebar(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => selectDoctor(doc)}
                className={`flex items-center gap-3 p-3 cursor-pointer border-b
                ${selectedDoctor.id === doc.id ? "bg-blue-50 border-r-4 border-blue-600" : "hover:bg-gray-50"}`}
              >
                <img src={doc.avatar} className="w-10 h-10 rounded-full" alt="" />
                <div>
                  <p className="font-semibold text-sm">{doc.name}</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* MAIN CHAT */}
      <main className="flex-1 flex flex-col bg-white min-w-0">

        {/* No doctor selected */}
        {!selectedDoctor ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 text-gray-500">
            <h2 className="text-xl font-bold mb-4">Select a doctor to start chatting</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md w-full">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => selectDoctor(doc)}
                  className="cursor-pointer flex items-center gap-3 p-3 border rounded-lg hover:shadow"
                >
                  <img src={doc.avatar} className="w-12 h-12 rounded-full" alt="" />
                  <div>
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* CONSTANT hhh */}
            <div className="flex-shrink-0 border-b bg-white z-20
             flex items-center h-12 px-2">
              <button className="sm:hidden mr-3" onClick={() => setShowSidebar(true)}>
                <Menu size={20} />
              </button>
              <img src={selectedDoctor.avatar} className="w-10 h-10 rounded-full" alt="" />
              <div className="ml-3">
                <p className="font-semibold">{selectedDoctor.name}</p>
                <p className="text-xs text-green-600">Active Conversation</p>
              </div>
            </div>

           { /* ME */}
            <section className="flex-1 overflow-y-auto bg-gray-50 px-3 py-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex mb-1 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-3 py-1.5 
                  rounded-2xl text-sm break-words
                    ${msg.from === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border text-gray-800 rounded-tl-none"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </section>

            {/* INPUT */}
            <footer className="border-t px-3 py-2 
            bg-white flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={taRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 resize-none rounded-2xl bg-gray-100 px-3 py-2 focus:outline-none text-sm max-h-24"
                />
                <button
                  onClick={send}
                  className={`p-2 rounded-full ${input.trim() ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"}`}
                >
                  <Send size={16} />
                </button>
              </div>
            </footer>
          </>
        )}
      </main>

      {/* MOBILE OVERLAY */}
      {showSidebar && <div className="fixed inset-0 bg-black/40 z-40 sm:hidden" onClick={() => setShowSidebar(false)} />}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  FileText, Plus, Search, Filter, Printer, Download, Copy, Check,
  Trash2, Edit3, Eye, ArrowLeft, Building2, User, Phone, Mail,
  Calendar, DollarSign, Percent, ShieldCheck, Clock, CheckCircle2,
  AlertCircle, Send, Sparkles, ChevronDown, BookOpen, Share2, Layers
} from 'lucide-react';
import { BRAND_INFO, CONTACT_INFO } from '../../constants/brand';

export interface ProposalItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Proposal {
  id: string;
  proposalNumber: string;
  leadId?: string;
  type: 'quotation' | 'proposal';
  title: string;
  clientName: string;
  clientCompany: string;
  clientRole?: string;
  clientPhone: string;
  clientEmail: string;
  clientTaxId?: string;
  clientAddress?: string;
  courseTitle: string;
  targetGroup: string;
  participantsCount: string;
  duration: string;
  trainingDates: string;
  venue: string;
  facilitatorName: string;
  items: ProposalItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  afterDiscount: number;
  includeVat: boolean;
  vatPercent: number;
  vatAmount: number;
  grandTotal: number;
  withholdingTaxPercent: number;
  withholdingTaxAmount: number;
  netPayable: number;
  paymentTerms: string;
  bankAccount: string;
  validityDays: number;
  notes: string;
  status: 'draft' | 'sent' | 'approved' | 'won' | 'lost';
  createdAt: string;
  updatedAt: string;
}

const PRESET_COURSES = [
  {
    title: 'Transformational Leadership: ผู้นำแห่งการเปลี่ยนแปลง',
    duration: '1-2 วัน (6-12 ชั่วโมง)',
    defaultPrice: 65000,
    target: 'ผู้บริหารระดับสูง, ผู้จัดการฝ่าย, ผู้นำทีม'
  },
  {
    title: 'The Modern Facilitator: ทักษะกระบวนกรยุคใหม่',
    duration: '2 วัน (12 ชั่วโมง)',
    defaultPrice: 75000,
    target: 'วิทยากรภายใน, HRD, L&D, Team Leaders'
  },
  {
    title: 'Creative Problem Solving (CPS): แก้ปัญหาและสร้างนวัตกรรม',
    duration: '1 วัน (6 ชั่วโมง)',
    defaultPrice: 55000,
    target: 'หัวหน้างาน, ทีม Product, ทีมปฏิบัติการ'
  },
  {
    title: 'Presentation Like a Pro: นำเสนองานอย่างมืออาชีพ',
    duration: '1 วัน (6 ชั่วโมง)',
    defaultPrice: 50000,
    target: 'หัวหน้างาน, พนักงานทุกระดับ, ฝ่ายขายและการตลาด'
  },
  {
    title: 'Storytelling for Business: เล่าเรื่องให้ธุรกิจเดิน',
    duration: '1 วัน (6 ชั่วโมง)',
    defaultPrice: 50000,
    target: 'ผู้นำทีม, ผู้บริหาร, ฝ่ายสื่อสารองค์กร'
  },
  {
    title: 'Communication Mastery: สื่อสารทรงพลังเพื่อประสิทธิผลทีม',
    duration: '1 วัน (6 ชั่วโมง)',
    defaultPrice: 50000,
    target: 'หัวหน้างานทุกระดับ, ทีมงานข้ามสายงาน'
  },
  {
    title: 'AI Mastery for Professionals: ยกระดับการทำงานด้วย AI',
    duration: '1 วัน (6 ชั่วโมง)',
    defaultPrice: 60000,
    target: 'พนักงานและผู้บริหารที่ต้องการใช้ GenAI เพิ่มผลิตภาพ'
  },
  {
    title: 'Conflict to Collaboration: ทลาย Silo สร้างทีมทรงพลัง',
    duration: '1 วัน (6 ชั่วโมง)',
    defaultPrice: 55000,
    target: 'ทีมงานที่ทำงานร่วมกันข้ามฝ่าย, หัวหน้าแผนก'
  },
  {
    title: 'Customized In-house Transformation Program (ออกแบบเฉพาะ)',
    duration: 'ตามที่ตกลง (Custom Scope)',
    defaultPrice: 85000,
    target: 'บุคลากรเป้าหมายตามผลการวิเคราะห์ TNA'
  }
];

const DEFAULT_PAYMENT_TERMS = `ชำระค่าบริการ 30% ก่อนวันจัดอบรมอย่างน้อย 14 วัน ส่วนอีก 70% จ่ายวันจัดอบรม\nกรณีโอนเข้าบัญชี: ธนาคารกรุงเทพ ออมทรัพย์ สาขาอโศกมนตรี | เลขที่บัญชี: 925-013747-9 | ชื่อบัญชี: อนุสรณ์ หนองนา`;

const DEFAULT_NOTES = `ราคานี้รวมค่าอุปกรณ์ Workshop และแบบประเมินผลแล้ว (ไม่รวมค่าสถานที่ อาหาร และเครื่องดื่มสัมมนาของผู้เรียน)\n\n** จึงเรียนมาเพื่อทราบ และโปรดพิจารณา สถาบันฯขอขอบพระคุณล่วงหน้ามา ณ โอกาสนี้`;

const INITIAL_PROPOSAL: Proposal = {
  id: '',
  proposalNumber: `CAP-QT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 900) + 100)}`,
  type: 'quotation',
  title: 'ข้อเสนอโครงการฝึกอบรมเชิงปฏิบัติการ (In-house Training Proposal)',
  clientName: '',
  clientCompany: '',
  clientRole: 'ผู้จัดการฝ่ายทรัพยากรบุคคล / L&D',
  clientPhone: '',
  clientEmail: '',
  clientTaxId: '',
  clientAddress: '',
  courseTitle: 'Transformational Leadership: ผู้นำแห่งการเปลี่ยนแปลง',
  targetGroup: 'ผู้บริหารระดับต้น-กลาง และหัวหน้างาน',
  participantsCount: '25 - 30 ท่าน / รุ่น',
  duration: '1 วัน (09.00 - 16.00 น. รวม 6 ชั่วโมง)',
  trainingDates: 'ตามที่ตกลงร่วมกัน',
  venue: 'ณ ห้องสัมมนาขององค์กร (In-house) หรือสถานที่ที่ผู้ว่าจ้างจัดเตรียม',
  facilitatorName: 'นายอนุสรณ์ หนองนา (ครูเด่น มาสเตอร์ฟา)',
  items: [
    {
      id: 'item-1',
      description: 'ค่าตอบแทนวิทยากรและกระบวนกรหลัก (Facilitator Fee) พร้อมออกแบบกระบวนการ',
      quantity: 1,
      unit: 'วัน/รุ่น',
      unitPrice: 60000,
      totalPrice: 60000,
    },
    {
      id: 'item-2',
      description: 'ค่าเอกสารประกอบการฝึกอบรม (Interactive Workbook & Handouts) 30 ชุด',
      quantity: 1,
      unit: 'ชุด/เหมา',
      unitPrice: 5000,
      totalPrice: 5000,
    },
    {
      id: 'item-3',
      description: 'ค่ารายงานสรุปผลการประเมินการเรียนรู้และข้อเสนอแนะเชิงกลยุทธ์ (Executive Post-Training Report)',
      quantity: 1,
      unit: 'รายงาน',
      unitPrice: 0,
      totalPrice: 0,
    }
  ],
  subtotal: 65000,
  discountPercent: 0,
  discountAmount: 0,
  afterDiscount: 65000,
  includeVat: true,
  vatPercent: 7,
  vatAmount: 4550,
  grandTotal: 69550,
  withholdingTaxPercent: 3,
  withholdingTaxAmount: 1950,
  netPayable: 67600,
  paymentTerms: DEFAULT_PAYMENT_TERMS,
  bankAccount: 'ธนาคารกรุงเทพ ออมทรัพย์ สาขาอโศกมนตรี | เลขที่บัญชี: 925-013747-9 | ชื่อบัญชี: อนุสรณ์ หนองนา',
  validityDays: 30,
  notes: DEFAULT_NOTES,
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const STORAGE_KEY = 'cap_proposals_store_v2';

export default function DashboardProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<Proposal>(INITIAL_PROPOSAL);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'quotation' | 'proposal'>('quotation');

  // Load proposals from LocalStorage
  useEffect(() => {
    loadProposals();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const leadName = params.get('name');
      const leadCompany = params.get('company');
      const leadPhone = params.get('phone');
      const leadEmail = params.get('email');
      const leadTopic = params.get('topic');

      if (leadName || leadCompany) {
        const newProp: Proposal = {
          ...INITIAL_PROPOSAL,
          id: `prop-${Date.now()}`,
          clientName: leadName || '',
          clientCompany: leadCompany || '',
          clientPhone: leadPhone || '',
          clientEmail: leadEmail || '',
          courseTitle: leadTopic && PRESET_COURSES.some(c => leadTopic.includes(c.title.split(':')[0])) 
            ? leadTopic 
            : INITIAL_PROPOSAL.courseTitle,
          proposalNumber: `CAP-QT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 900) + 100)}`
        };
        setCurrentEdit(newProp);
        setIsEditing(true);
        setSelectedProposal(null);
      }
    }
  }, []);

  const loadProposals = () => {
    try {
      const localData = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) || localStorage.getItem('cap_proposals_store_v1')) : null;
      if (localData) {
        const parsed: Proposal[] = JSON.parse(localData);
        // Auto-migrate old payment terms
        const migrated = parsed.map(p => {
          if (!p.paymentTerms || p.paymentTerms.includes('ชำระงวดเดียว 100%') || p.paymentTerms.includes('กสิกรไทย')) {
            return {
              ...p,
              paymentTerms: DEFAULT_PAYMENT_TERMS,
              notes: DEFAULT_NOTES,
              bankAccount: 'ธนาคารกรุงเทพ ออมทรัพย์ สาขาอโศกมนตรี | เลขที่บัญชี: 925-013747-9 | ชื่อบัญชี: อนุสรณ์ หนองนา'
            };
          }
          return p;
        });
        setProposals(migrated);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        }
      } else {
        setProposals([]);
      }
    } catch (e) {
      console.error('Error loading proposals:', e);
    }
  };

  const saveProposalsToStorage = (list: Proposal[]) => {
    setProposals(list);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  };

  const updateCalculations = (prop: Proposal): Proposal => {
    const subtotal = prop.items.reduce((acc, it) => acc + (Number(it.quantity) * Number(it.unitPrice)), 0);
    const discountAmount = (subtotal * Number(prop.discountPercent || 0)) / 100;
    const afterDiscount = Math.max(0, subtotal - discountAmount);
    const vatAmount = prop.includeVat ? (afterDiscount * Number(prop.vatPercent || 7)) / 100 : 0;
    const grandTotal = afterDiscount + vatAmount;
    const withholdingTaxAmount = (afterDiscount * Number(prop.withholdingTaxPercent || 3)) / 100;
    const netPayable = grandTotal - withholdingTaxAmount;

    return {
      ...prop,
      subtotal,
      discountAmount,
      afterDiscount,
      vatAmount,
      grandTotal,
      withholdingTaxAmount,
      netPayable,
      updatedAt: new Date().toISOString()
    };
  };

  const handleCreateNew = () => {
    const newProp: Proposal = {
      ...INITIAL_PROPOSAL,
      id: `prop-${Date.now()}`,
      proposalNumber: `CAP-QT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 900) + 100)}`
    };
    setCurrentEdit(newProp);
    setIsEditing(true);
    setSelectedProposal(null);
  };

  const handleEditProposal = (prop: Proposal) => {
    setCurrentEdit(prop);
    setIsEditing(true);
    setSelectedProposal(null);
  };

  const handleSaveProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const finalized = updateCalculations(currentEdit);
    const exists = proposals.some(p => p.id === finalized.id);
    let updated: Proposal[];
    if (exists) {
      updated = proposals.map(p => p.id === finalized.id ? finalized : p);
    } else {
      updated = [finalized, ...proposals];
    }
    saveProposalsToStorage(updated);
    setIsEditing(false);
    setSelectedProposal(finalized);
  };

  const handleDeleteProposal = (id: string) => {
    if (typeof window !== 'undefined' && window.confirm('คุณต้องการลบเอกสารใบเสนอราคานี้ใช่หรือไม่?')) {
      const updated = proposals.filter(p => p.id !== id);
      saveProposalsToStorage(updated);
      if (selectedProposal?.id === id) setSelectedProposal(null);
    }
  };

  const handleUpdateStatus = (id: string, status: Proposal['status']) => {
    const updated = proposals.map(p => p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p);
    saveProposalsToStorage(updated);
    if (selectedProposal?.id === id) {
      setSelectedProposal({ ...selectedProposal, status });
    }
  };

  const handleAddItem = () => {
    const newItem: ProposalItem = {
      id: `item-${Date.now()}`,
      description: 'รายการบริการ / เพิ่มเติม',
      quantity: 1,
      unit: 'รุ่น',
      unitPrice: 10000,
      totalPrice: 10000
    };
    const updated = {
      ...currentEdit,
      items: [...currentEdit.items, newItem]
    };
    setCurrentEdit(updateCalculations(updated));
  };

  const handleRemoveItem = (itemId: string) => {
    const updated = {
      ...currentEdit,
      items: currentEdit.items.filter(it => it.id !== itemId)
    };
    setCurrentEdit(updateCalculations(updated));
  };

  const handleItemChange = (itemId: string, field: keyof ProposalItem, value: any) => {
    const updatedItems = currentEdit.items.map(it => {
      if (it.id === itemId) {
        const newItem = { ...it, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          newItem.totalPrice = Number(newItem.quantity || 0) * Number(newItem.unitPrice || 0);
        }
        return newItem;
      }
      return it;
    });
    const updated = { ...currentEdit, items: updatedItems };
    setCurrentEdit(updateCalculations(updated));
  };

  const handleSelectPresetCourse = (course: typeof PRESET_COURSES[0]) => {
    const updatedItems = [...currentEdit.items];
    if (updatedItems.length > 0) {
      updatedItems[0] = {
        ...updatedItems[0],
        description: `ค่าตอบแทนวิทยากรและกระบวนกรหลัก (Facilitator Fee) หลักสูตร "${course.title}"`,
        unitPrice: course.defaultPrice,
        totalPrice: course.defaultPrice * updatedItems[0].quantity
      };
    }
    const updated = {
      ...currentEdit,
      courseTitle: course.title,
      duration: course.duration,
      targetGroup: course.target,
      items: updatedItems
    };
    setCurrentEdit(updateCalculations(updated));
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleCopySummary = () => {
    if (!selectedProposal || typeof window === 'undefined') return;
    const p = selectedProposal;
    const text = `📄 สรุปใบเสนอราคา CAP Vision Institute
เลขที่: ${p.proposalNumber}
เรียน: ${p.clientName} (${p.clientCompany})
หลักสูตร: ${p.courseTitle}
ระยะเวลา: ${p.duration} (${p.participantsCount})
ยอดเงินรวมทั้งสิ้น (รวม VAT): ฿${p.grandTotal.toLocaleString()} บาท
หัก ณ ที่จ่าย 3%: ฿${p.withholdingTaxAmount.toLocaleString()} บาท
ยอดโอนสุทธิ: ฿${p.netPayable.toLocaleString()} บาท
วิทยากร: ${p.facilitatorName}
ติดต่อ: ครูเด่น มาสเตอร์ฟา 093-223-5919`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProposals = proposals.filter(p => {
    const matchesSearch =
      p.proposalNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'draft':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-200">ร่างเอกสาร (Draft)</span>;
      case 'sent':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 border border-blue-200">ส่งลูกค้าแล้ว (Sent)</span>;
      case 'approved':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">อนุมัติแล้ว (Approved)</span>;
      case 'won':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">ปิดการขายแล้ว (Won)</span>;
      case 'lost':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 border border-red-200">ยกเลิก (Lost)</span>;
    }
  };

  const totalRevenue = proposals.reduce((acc, p) => p.status === 'won' || p.status === 'approved' ? acc + p.grandTotal : acc, 0);
  const pipelineRevenue = proposals.reduce((acc, p) => acc + p.grandTotal, 0);
  const wonCount = proposals.filter(p => p.status === 'won' || p.status === 'approved').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-document, #printable-document * {
            visibility: visible;
          }
          #printable-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
            Executive Quotation & Proposal Generator
          </div>
          <p className="text-sm text-gray-600">เอกสารส่วนนี้บันทึกในเบราว์เซอร์และอุปกรณ์นี้ กรุณาส่งออกเอกสารเพื่อสำรองข้อมูล</p>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font">
            ระบบออกใบเสนอราคา & ข้อเสนอโครงการ (Proposals)
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            สร้าง จัดการ และออกเอกสารใบเสนอราคาหลักสูตร In-house Training & Consulting ระดับผู้บริหาร
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          สร้างใบเสนอราคาใหม่ (+ New)
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">มูลค่าโครงการที่ปิดได้</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#111827]">
            ฿{totalRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ อนุมัติแล้ว {wonCount} โครงการ</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">มูลค่า Pipeline รวม</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#111827]">
            ฿{pipelineRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">จากทั้งหมด {proposals.length} ข้อเสนอ</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ส่งแล้วรอยืนยัน</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">
            {proposals.filter(p => p.status === 'sent').length}
          </div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">กำลังพิจารณา</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Win Rate</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#111827]">
            {proposals.length ? Math.round((wonCount / proposals.length) * 100) : 0}%
          </div>
          <p className="text-[11px] text-purple-600 font-bold mt-1">อัตราปิดการขาย</p>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden no-print">
          <div className="bg-[#111827] text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-lg font-black nav-font">
                  {currentEdit.id ? 'แก้ไขใบเสนอราคา / ข้อเสนอโครงการ' : 'สร้างใบเสนอราคาใหม่'}
                </h2>
                <p className="text-xs text-gray-400">เลขที่เอกสาร: {currentEdit.proposalNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-300 font-bold hidden sm:inline">ประเภทเอกสาร:</span>
              <select
                value={currentEdit.type}
                onChange={e => setCurrentEdit({ ...currentEdit, type: e.target.value as any })}
                className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="quotation" className="text-gray-900">ใบเสนอราคา (Quotation)</option>
                <option value="proposal" className="text-gray-900">ข้อเสนอโครงการ (Training Proposal)</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleSaveProposal} className="p-6 sm:p-8 space-y-8">
            
            <div className="bg-blue-50/70 border border-blue-200/80 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-xs font-black text-[#0F2557] uppercase tracking-wider">
                  เลือกจากคลังหลักสูตรยอดนิยม (1-Click Auto Fill):
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESET_COURSES.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPresetCourse(c)}
                    className="text-xs bg-white hover:bg-[#2563EB] hover:text-white border border-blue-200 text-gray-700 px-3 py-1.5 rounded-xl font-bold transition-all text-left shadow-2xs"
                  >
                    + {c.title.split(':')[0]} (฿{c.defaultPrice.toLocaleString()})
                  </button>
                ))}
              </div>
            </div>

            {/* 1. Client Info */}
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#2563EB]" />
                1. ข้อมูลลูกค้าและหน่วยงานผู้ว่าจ้าง
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ชื่อหน่วยงาน / องค์กร <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentEdit.clientCompany}
                    onChange={e => setCurrentEdit({ ...currentEdit, clientCompany: e.target.value })}
                    placeholder="เช่น บริษัท พัฒนาธุรกิจ จำกัด (มหาชน)"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ชื่อผู้ติดต่อ / HR / ผู้บริหาร <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentEdit.clientName}
                    onChange={e => setCurrentEdit({ ...currentEdit, clientName: e.target.value })}
                    placeholder="เช่น คุณสมชาย มุ่งมั่น"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ตำแหน่ง / บทบาท
                  </label>
                  <input
                    type="text"
                    value={currentEdit.clientRole || ''}
                    onChange={e => setCurrentEdit({ ...currentEdit, clientRole: e.target.value })}
                    placeholder="เช่น HRD Manager / CEO"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    เบอร์โทรศัพท์ติดต่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={currentEdit.clientPhone}
                    onChange={e => setCurrentEdit({ ...currentEdit, clientPhone: e.target.value })}
                    placeholder="08x-xxx-xxxx"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    อีเมลลูกค้า
                  </label>
                  <input
                    type="email"
                    value={currentEdit.clientEmail}
                    onChange={e => setCurrentEdit({ ...currentEdit, clientEmail: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    เลขประจำตัวผู้เสียภาษี (Tax ID)
                  </label>
                  <input
                    type="text"
                    value={currentEdit.clientTaxId || ''}
                    onChange={e => setCurrentEdit({ ...currentEdit, clientTaxId: e.target.value })}
                    placeholder="เลขประจำตัว 13 หลัก"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ที่อยู่หน่วยงาน (สำหรับออกใบเสร็จ / ใบกำกับภาษี)
                  </label>
                  <input
                    type="text"
                    value={currentEdit.clientAddress || ''}
                    onChange={e => setCurrentEdit({ ...currentEdit, clientAddress: e.target.value })}
                    placeholder="เลขที่ อาคาร ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Course Scope */}
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2563EB]" />
                2. ขอบเขตหลักสูตรและการจัดอบรม (Training Scope)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ชื่อหลักสูตร / โครงการ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentEdit.courseTitle}
                    onChange={e => setCurrentEdit({ ...currentEdit, courseTitle: e.target.value })}
                    placeholder="ชื่อหลักสูตรการอบรม"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none font-bold text-[#0F2557]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    วิทยากรและกระบวนกรหลัก
                  </label>
                  <input
                    type="text"
                    value={currentEdit.facilitatorName}
                    onChange={e => setCurrentEdit({ ...currentEdit, facilitatorName: e.target.value })}
                    placeholder="ชื่อวิทยากร"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    กลุ่มเป้าหมายผู้เรียน
                  </label>
                  <input
                    type="text"
                    value={currentEdit.targetGroup}
                    onChange={e => setCurrentEdit({ ...currentEdit, targetGroup: e.target.value })}
                    placeholder="เช่น ผู้จัดการระดับกลาง, หัวหน้าทีม"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    จำนวนผู้เข้าอบรม
                  </label>
                  <input
                    type="text"
                    value={currentEdit.participantsCount}
                    onChange={e => setCurrentEdit({ ...currentEdit, participantsCount: e.target.value })}
                    placeholder="เช่น 25 - 30 ท่าน / รุ่น"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ระยะเวลาการอบรม
                  </label>
                  <input
                    type="text"
                    value={currentEdit.duration}
                    onChange={e => setCurrentEdit({ ...currentEdit, duration: e.target.value })}
                    placeholder="เช่น 1 วัน (6 ชั่วโมง)"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    วันที่จัดอบรม
                  </label>
                  <input
                    type="text"
                    value={currentEdit.trainingDates}
                    onChange={e => setCurrentEdit({ ...currentEdit, trainingDates: e.target.value })}
                    placeholder="เช่น วันที่ 25 พฤษภาคม 2569 หรือ ตามที่ตกลง"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    สถานที่จัดอบรม (Venue)
                  </label>
                  <input
                    type="text"
                    value={currentEdit.venue}
                    onChange={e => setCurrentEdit({ ...currentEdit, venue: e.target.value })}
                    placeholder="เช่น ณ ห้องสัมมนาสำนักงานใหญ่ หรือ โรงแรมที่ผู้ว่าจ้างจัดสรร"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Pricing Items Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#2563EB]" />
                  3. รายการค่าบริการและการคำนวณราคา (Price Breakdown)
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> เพิ่มรายการ
                </button>
              </div>

              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 w-12 text-center">#</th>
                      <th className="p-3.5">รายละเอียดรายการ</th>
                      <th className="p-3.5 w-24 text-center">จำนวน</th>
                      <th className="p-3.5 w-28 text-center">หน่วย</th>
                      <th className="p-3.5 w-32 text-right">ราคา/หน่วย (฿)</th>
                      <th className="p-3.5 w-32 text-right">รวมเงิน (฿)</th>
                      <th className="p-3.5 w-12 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentEdit.items.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-gray-50/60">
                        <td className="p-3.5 text-center text-gray-400 font-bold">{idx + 1}</td>
                        <td className="p-3.5">
                          <input
                            type="text"
                            value={item.description}
                            onChange={e => handleItemChange(item.id, 'description', e.target.value)}
                            placeholder="ระบุรายละเอียดค่าบริการ..."
                            className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#2563EB] outline-none font-medium py-1"
                          />
                        </td>
                        <td className="p-3.5">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={e => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                            className="w-full bg-gray-50 text-center border border-gray-200 rounded-lg p-1.5 font-bold"
                          />
                        </td>
                        <td className="p-3.5">
                          <input
                            type="text"
                            value={item.unit}
                            onChange={e => handleItemChange(item.id, 'unit', e.target.value)}
                            placeholder="รุ่น/วัน"
                            className="w-full bg-gray-50 text-center border border-gray-200 rounded-lg p-1.5"
                          />
                        </td>
                        <td className="p-3.5">
                          <input
                            type="number"
                            step="500"
                            value={item.unitPrice}
                            onChange={e => handleItemChange(item.id, 'unitPrice', Number(e.target.value))}
                            className="w-full bg-gray-50 text-right border border-gray-200 rounded-lg p-1.5 font-mono font-bold"
                          />
                        </td>
                        <td className="p-3.5 text-right font-mono font-bold text-gray-900">
                          ฿{item.totalPrice.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-center">
                          {currentEdit.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col md:flex-row justify-between gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <div className="space-y-3 flex-1 max-w-md">
                  <div className="flex items-center gap-4">
                    <label className="text-xs font-bold text-gray-700 w-36">ส่วนลดพิเศษ (%):</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentEdit.discountPercent}
                      onChange={e => setCurrentEdit(updateCalculations({ ...currentEdit, discountPercent: Number(e.target.value) }))}
                      className="w-24 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-sm font-bold text-center"
                    />
                    <span className="text-xs text-gray-500 font-mono">(-฿{currentEdit.discountAmount.toLocaleString()})</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="text-xs font-bold text-gray-700 w-36">ภาษีมูลค่าเพิ่ม (VAT):</label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                      <input
                        type="checkbox"
                        checked={currentEdit.includeVat}
                        onChange={e => setCurrentEdit(updateCalculations({ ...currentEdit, includeVat: e.target.checked }))}
                        className="w-4 h-4 text-[#2563EB] rounded"
                      />
                      คิด VAT 7%
                    </label>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="text-xs font-bold text-gray-700 w-36">หักภาษี ณ ที่จ่าย (%):</label>
                    <select
                      value={currentEdit.withholdingTaxPercent}
                      onChange={e => setCurrentEdit(updateCalculations({ ...currentEdit, withholdingTaxPercent: Number(e.target.value) }))}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold"
                    >
                      <option value="3">หัก 3% (บริการฝึกอบรม/วิทยากร)</option>
                      <option value="1">หัก 1% (ค่าขนส่ง/บริการอื่น)</option>
                      <option value="0">ไม่หัก (0%)</option>
                    </select>
                  </div>
                </div>

                <div className="w-full md:w-80 space-y-2 text-sm font-bold">
                  <div className="flex justify-between text-gray-600 text-xs">
                    <span>รวมเงิน (Subtotal):</span>
                    <span className="font-mono">฿{currentEdit.subtotal.toLocaleString()}</span>
                  </div>
                  {currentEdit.discountAmount > 0 && (
                    <div className="flex justify-between text-red-600 text-xs">
                      <span>ส่วนลด ({currentEdit.discountPercent}%):</span>
                      <span className="font-mono">-฿{currentEdit.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700 text-xs">
                    <span>ยอดหลังหักส่วนลด:</span>
                    <span className="font-mono">฿{currentEdit.afterDiscount.toLocaleString()}</span>
                  </div>
                  {currentEdit.includeVat && (
                    <div className="flex justify-between text-gray-600 text-xs">
                      <span>ภาษีมูลค่าเพิ่ม (VAT 7%):</span>
                      <span className="font-mono">฿{currentEdit.vatAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-[#0F2557] pt-2 border-t border-gray-300">
                    <span>ยอดรวมทั้งสิ้น (Grand Total):</span>
                    <span className="font-mono text-[#2563EB]">฿{currentEdit.grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pt-1 border-t border-dashed border-gray-200">
                    <span>หัก ณ ที่จ่าย ({currentEdit.withholdingTaxPercent}%):</span>
                    <span className="font-mono text-gray-600">-฿{currentEdit.withholdingTaxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-emerald-700">
                    <span>ยอดชำระสุทธิ (Net Payable):</span>
                    <span className="font-mono">฿{currentEdit.netPayable.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Terms & Bank Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  เงื่อนไขการชำระเงิน (Payment Terms)
                </label>
                <textarea
                  rows={2}
                  value={currentEdit.paymentTerms}
                  onChange={e => setCurrentEdit({ ...currentEdit, paymentTerms: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ข้อมูลบัญชีรับโอนเงิน
                </label>
                <textarea
                  rows={2}
                  value={currentEdit.bankAccount}
                  onChange={e => setCurrentEdit({ ...currentEdit, bankAccount: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  หมายเหตุเพิ่มเติม (Notes & Deliverables)
                </label>
                <textarea
                  rows={2}
                  value={currentEdit.notes}
                  onChange={e => setCurrentEdit({ ...currentEdit, notes: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:bg-white focus:ring-2 focus:ring-[#2563EB] outline-none"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-gray-700">สถานะเอกสาร:</label>
                <select
                  value={currentEdit.status}
                  onChange={e => setCurrentEdit({ ...currentEdit, status: e.target.value as any })}
                  className="bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold cursor-pointer"
                >
                  <option value="draft">ร่างเอกสาร (Draft)</option>
                  <option value="sent">ส่งลูกค้าแล้ว (Sent)</option>
                  <option value="approved">อนุมัติแล้ว (Approved)</option>
                  <option value="won">ปิดการขายสำเร็จ (Won)</option>
                  <option value="lost">ยกเลิก (Lost)</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-sm shadow-md transition-all active:scale-95"
                >
                  💾 บันทึกเอกสาร & แสดงตัวอย่าง
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : selectedProposal ? (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4 no-print">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedProposal(null)}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-xs font-bold text-gray-400">กำลังดูเอกสาร:</span>
                <h3 className="text-base font-black text-[#0F2557] nav-font">
                  {selectedProposal.proposalNumber} — {selectedProposal.clientCompany}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('quotation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'quotation' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-gray-600'
                  }`}
                >
                  ใบเสนอราคา (Quotation)
                </button>
                <button
                  onClick={() => setActiveTab('proposal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'proposal' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-gray-600'
                  }`}
                >
                  ข้อเสนอโครงการ (Proposal)
                </button>
              </div>

              <button
                onClick={handlePrint}
                className="bg-[#111827] hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Printer className="w-4 h-4" /> พิมพ์ / PDF
              </button>

              <button
                onClick={handleCopySummary}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'คัดลอกแล้ว!' : 'คัดลอกสรุป'}
              </button>

              <button
                onClick={() => handleEditProposal(selectedProposal)}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Edit3 className="w-4 h-4" /> แก้ไขเอกสาร
              </button>

              <select
                value={selectedProposal.status}
                onChange={e => handleUpdateStatus(selectedProposal.id, e.target.value as any)}
                className="bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold cursor-pointer"
              >
                <option value="draft">สถานะ: Draft</option>
                <option value="sent">สถานะ: Sent</option>
                <option value="approved">สถานะ: Approved</option>
                <option value="won">สถานะ: Won (ปิดดีล)</option>
                <option value="lost">สถานะ: Lost</option>
              </select>
            </div>
          </div>

          {/* DOCUMENT CANVAS */}
          <div
            id="printable-document"
            className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 sm:p-14 max-w-4xl mx-auto text-gray-900 font-sans"
            style={{ minHeight: '1050px' }}
          >
            {/* Letterhead */}
            <div className="flex justify-between items-start border-b-2 border-[#0F2557] pb-6 mb-6">
              <div className="flex items-start gap-4">
                <img
                  src="https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/about%20us/cap%20vision%20logo.png"
                  alt="CAP Vision Institute Logo"
                  className="h-16 sm:h-20 w-auto object-contain shrink-0"
                />
                <div>
                  <h2 className="text-xl font-black text-[#0F2557] nav-font tracking-tight uppercase">
                    CAP Vision Institute
                  </h2>
                  <p className="text-xs text-gray-600 font-bold">สถาบันพัฒนาศักยภาพผู้นำและองค์กร</p>
                  <p className="text-[11px] text-gray-500 mt-1 leading-tight max-w-md">
                    {CONTACT_INFO.address}<br />
                    โทร: {CONTACT_INFO.phone} | Email: {CONTACT_INFO.email} | เว็บไซต์: capvisionpartner.com
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block bg-[#0F2557] text-white px-4 py-1.5 rounded-lg text-sm font-black nav-font uppercase tracking-wider mb-2">
                  {activeTab === 'quotation' ? 'ใบเสนอราคา / QUOTATION' : 'ข้อเสนอโครงการ / PROPOSAL'}
                </div>
                <div className="text-xs space-y-0.5 text-gray-600">
                  <p><span className="font-bold">เลขที่เอกสาร:</span> <span className="font-mono font-bold text-[#2563EB]">{selectedProposal.proposalNumber}</span></p>
                  <p><span className="font-bold">วันที่ออก:</span> {new Date(selectedProposal.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><span className="font-bold">กำหนดยืนราคา:</span> {selectedProposal.validityDays} วัน</p>
                </div>
              </div>
            </div>

            {/* Client Info Grid */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">ข้อมูลลูกค้า / ผู้ว่าจ้าง</p>
                  <p className="font-black text-base text-[#0F2557]">{selectedProposal.clientCompany}</p>
                  <p className="font-medium text-gray-700 mt-0.5">
                    <strong>ผู้ติดต่อ:</strong> {selectedProposal.clientName} ({selectedProposal.clientRole || 'ผู้รับผิดชอบโครงการ'})
                  </p>
                  {selectedProposal.clientAddress && (
                    <p className="text-gray-600 text-xs mt-1"><strong>ที่อยู่:</strong> {selectedProposal.clientAddress}</p>
                  )}
                  {selectedProposal.clientTaxId && (
                    <p className="text-gray-600 text-xs"><strong>เลขประจำตัวผู้เสียภาษี:</strong> {selectedProposal.clientTaxId}</p>
                  )}
                </div>

                <div className="sm:border-l sm:border-gray-200 sm:pl-4 space-y-1">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">รายละเอียดการติดต่อ & การจัดอบรม</p>
                  <p className="text-gray-700"><strong>เบอร์โทร:</strong> {selectedProposal.clientPhone}</p>
                  {selectedProposal.clientEmail && (
                    <p className="text-gray-700"><strong>อีเมล:</strong> {selectedProposal.clientEmail}</p>
                  )}
                  <p className="text-gray-700"><strong>วันที่จัด:</strong> {selectedProposal.trainingDates}</p>
                  <p className="text-gray-700"><strong>สถานที่:</strong> {selectedProposal.venue}</p>
                </div>
              </div>
            </div>

            {/* Project Scope Banner */}
            <div className="bg-[#2563EB]/10 border border-[#2563EB]/25 rounded-2xl p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-wider">หลักสูตรฝึกอบรม</span>
                  <h3 className="text-base sm:text-lg font-black text-[#0F2557] nav-font">{selectedProposal.courseTitle}</h3>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5 sm:text-right shrink-0">
                  <p><strong>ระยะเวลา:</strong> {selectedProposal.duration}</p>
                  <p><strong>กลุ่มเป้าหมาย:</strong> {selectedProposal.participantsCount}</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden mb-6">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0F2557] text-white font-bold">
                  <tr>
                    <th className="p-3 w-12 text-center">ลำดับ</th>
                    <th className="p-3">รายละเอียดการบริการ / รายการ</th>
                    <th className="p-3 w-20 text-center">จำนวน</th>
                    <th className="p-3 w-24 text-center">หน่วย</th>
                    <th className="p-3 w-32 text-right">ราคา/หน่วย</th>
                    <th className="p-3 w-32 text-right">จำนวนเงิน (บาท)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedProposal.items.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="p-3 text-center text-gray-500 font-bold">{idx + 1}</td>
                      <td className="p-3 font-medium text-gray-800">{item.description}</td>
                      <td className="p-3 text-center font-bold">{item.quantity}</td>
                      <td className="p-3 text-center text-gray-600">{item.unit}</td>
                      <td className="p-3 text-right font-mono">{item.unitPrice ? `฿${item.unitPrice.toLocaleString()}` : '-'}</td>
                      <td className="p-3 text-right font-mono font-bold text-gray-900">{item.totalPrice ? `฿${item.totalPrice.toLocaleString()}` : 'รวมในหลักสูตร'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Calculation Summary */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
              <div className="flex-1 text-xs text-gray-700 bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                <p className="font-bold text-[#0F2557] text-sm">
                  เงื่อนไขการเสนอราคา <span className="text-red-600 font-bold">กำหนดชำระเงิน:</span>
                </p>
                <div className="space-y-3 text-xs text-gray-800 leading-relaxed">
                  <p className="whitespace-pre-line font-medium leading-relaxed">
                    {selectedProposal.paymentTerms || DEFAULT_PAYMENT_TERMS}
                  </p>
                  {selectedProposal.notes && (
                    <p className="whitespace-pre-line text-gray-800 font-medium leading-relaxed pt-1">
                      {selectedProposal.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full sm:w-72 space-y-1.5 text-xs sm:text-sm font-bold bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>รวมเป็นเงิน:</span>
                  <span className="font-mono">฿{selectedProposal.subtotal.toLocaleString()}</span>
                </div>
                {selectedProposal.discountAmount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>ส่วนลดพิเศษ ({selectedProposal.discountPercent}%):</span>
                    <span className="font-mono">-฿{selectedProposal.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                {selectedProposal.includeVat && (
                  <div className="flex justify-between text-gray-600">
                    <span>ภาษีมูลค่าเพิ่ม (VAT 7%):</span>
                    <span className="font-mono">฿{selectedProposal.vatAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-[#0F2557] pt-2 border-t border-gray-300">
                  <span>ยอดรวมสุทธิ:</span>
                  <span className="font-mono text-[#2563EB]">฿{selectedProposal.grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-500 pt-1 border-t border-dashed border-gray-300">
                  <span>หักภาษี ณ ที่จ่าย ({selectedProposal.withholdingTaxPercent}%):</span>
                  <span className="font-mono">-฿{selectedProposal.withholdingTaxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-black text-emerald-800">
                  <span>ยอดโอนสุทธิ:</span>
                  <span className="font-mono">฿{selectedProposal.netPayable.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Signature Block */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-300 text-center text-xs">
              <div>
                <p className="font-bold text-gray-700 mb-12">ในนาม ผู้เสนอราคา / CAP Vision Institute</p>
                <div className="w-56 mx-auto border-b border-gray-400 pb-1 font-bold text-gray-900 whitespace-nowrap">
                  ( นายอนุสรณ์ หนองนา )
                </div>
                <p className="text-[10px] text-gray-500 mt-1">ผู้อำนวยการฝ่ายพัฒนาหลักสูตรและกระบวนการเรียนรู้</p>
                <p className="text-[10px] text-gray-400">วันที่: {new Date(selectedProposal.createdAt).toLocaleDateString('th-TH')}</p>
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-12">ในนาม ผู้ว่าจ้าง / ผู้อนุมัติโครงการ</p>
                <div className="w-56 mx-auto border-b border-gray-400 pb-1 font-bold text-gray-900">
                  (...............................................................)
                </div>
                <p className="text-[10px] text-gray-500 mt-1">ตำแหน่ง: ..............................................................</p>
                <p className="text-[10px] text-gray-400">วันที่: ......./......./...........</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 no-print">
          <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-6 rounded-3xl shadow-xs border border-gray-100">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาเลขที่เอกสาร, ชื่อบริษัท, ผู้ติดต่อ, หรือหลักสูตร..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'draft', label: 'ร่าง' },
                { id: 'sent', label: 'ส่งแล้ว' },
                { id: 'approved', label: 'อนุมัติแล้ว' },
                { id: 'won', label: 'ปิดดีลสำเร็จ' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === st.id
                      ? 'bg-[#0F2557] text-white shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {filteredProposals.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-base font-bold text-gray-700">ไม่พบเอกสารใบเสนอราคา</p>
              <p className="text-xs text-gray-400 mt-1">คลิกที่ปุ่ม "สร้างใบเสนอราคาใหม่" เพื่อเริ่มต้นออกเอกสารแรก</p>
              <button
                onClick={handleCreateNew}
                className="mt-4 inline-flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
              >
                <Plus className="w-4 h-4" /> สร้างใบเสนอราคาใหม่
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProposals.map(prop => (
                <div
                  key={prop.id}
                  className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-lg">
                          {prop.proposalNumber}
                        </span>
                      </div>
                      <div>{getStatusBadge(prop.status)}</div>
                    </div>

                    <h3 className="font-black text-lg text-[#0F2557] nav-font mb-1 line-clamp-1">
                      {prop.clientCompany}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3 font-medium">
                      <User className="w-3.5 h-3.5 text-gray-400" /> {prop.clientName}
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 mb-4 space-y-1 text-xs">
                      <p className="font-bold text-[#0F2557] line-clamp-1">{prop.courseTitle}</p>
                      <p className="text-gray-500">ระยะเวลา: {prop.duration}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-gray-500">ยอดรวม:</span>
                        <span className="text-base font-black text-[#2563EB] font-mono">
                          ฿{prop.grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="text-[10px] text-gray-400">
                      {new Date(prop.createdAt).toLocaleDateString('th-TH')}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedProposal(prop)}
                        className="bg-[#2563EB]/10 hover:bg-[#2563EB] text-[#2563EB] hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> ดูเอกสาร
                      </button>
                      <button
                        onClick={() => handleEditProposal(prop)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="แก้ไข"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProposal(prop.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="ลบ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

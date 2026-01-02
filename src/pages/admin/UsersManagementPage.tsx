import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Wallet,
  RefreshCw,
  Download,
  UserCheck,
  UserX,
  Crown,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || '';

interface User {
  id: string;
  clerkUserId: string;
  email: string;
  fullName: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  country: string | null;
  countryName: string | null;
  city: string | null;
  phone: string | null;
  investorType: string;
  investorStatus: string | null;
  kycStatus: string;
  complianceStatus: string;
  membershipTier: string;
  totalInvested: number;
  totalReturns: number;
  activeInvestments: number;
  isAdmin: boolean;
  isActive: boolean;
  isBanned: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

const kycStatusConfig: Record<string, { label: string; color: string; icon: any }> = {
  NOT_STARTED: { label: "Not Started", color: "bg-slate-100 text-slate-600", icon: Clock },
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  IN_REVIEW: { label: "In Review", color: "bg-blue-100 text-blue-700", icon: Eye },
  APPROVED: { label: "Approved", color: "bg-green-100 text-green-700", icon: CheckCircle },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
  EXPIRED: { label: "Expired", color: "bg-orange-100 text-orange-700", icon: AlertTriangle },
};

const investorTypeConfig: Record<string, { label: string; color: string }> = {
  RETAIL: { label: "Retail", color: "bg-slate-100 text-slate-600" },
  PROFESSIONAL: { label: "Professional", color: "bg-blue-100 text-blue-700" },
  QUALIFIED: { label: "Qualified", color: "bg-purple-100 text-purple-700" },
  INSTITUTIONAL: { label: "Institutional", color: "bg-indigo-100 text-indigo-700" },
};

const membershipConfig: Record<string, { label: string; color: string; icon: any }> = {
  FREE: { label: "Free", color: "bg-slate-100 text-slate-600", icon: Users },
  BASIC: { label: "Basic", color: "bg-blue-100 text-blue-700", icon: Users },
  PREMIUM: { label: "Premium", color: "bg-purple-100 text-purple-700", icon: Crown },
  VIP: { label: "VIP", color: "bg-amber-100 text-amber-700", icon: Crown },
};

export default function UsersManagementPage() {
  const { user: currentUser } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [kycFilter, setKycFilter] = useState<string>("all");
  const [investorTypeFilter, setInvestorTypeFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/admin/users`);
      
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.country?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesKyc = kycFilter === "all" || user.kycStatus === kycFilter;
    const matchesType = investorTypeFilter === "all" || user.investorType === investorTypeFilter;
    
    return matchesSearch && matchesKyc && matchesType;
  });

  const stats = {
    total: users.length,
    kycApproved: users.filter(u => u.kycStatus === 'APPROVED').length,
    professional: users.filter(u => u.investorType === 'PROFESSIONAL' || u.investorType === 'QUALIFIED').length,
    active: users.filter(u => u.activeInvestments > 0).length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        adminName={currentUser?.fullName || currentUser?.firstName || 'Admin'}
        adminEmail={currentUser?.email || ''}
      />

      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
      >
        <header className="sticky top-0 z-30 border-b border-border/60 bg-card/80 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-serif font-semibold text-foreground">User Management</h1>
              <p className="text-sm text-muted-foreground">Manage investors and platform users</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={fetchUsers} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Users className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">KYC Approved</p>
                <p className="text-2xl font-bold text-slate-900">{stats.kycApproved}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Professional+</p>
                <p className="text-2xl font-bold text-slate-900">{stats.professional}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Active Investors</p>
                <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, email, or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={kycFilter} onValueChange={setKycFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="KYC Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All KYC Status</SelectItem>
                <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_REVIEW">In Review</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={investorTypeFilter} onValueChange={setInvestorTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Investor Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="RETAIL">Retail</SelectItem>
                <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                <SelectItem value="QUALIFIED">Qualified</SelectItem>
                <SelectItem value="INSTITUTIONAL">Institutional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>User</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Investor Type</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead className="text-right">Total Invested</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto text-slate-400" />
                    <p className="text-slate-500 mt-2">Loading users...</p>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-slate-300" />
                    <p className="text-slate-500 mt-2">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => {
                  const kycConfig = kycStatusConfig[user.kycStatus] || kycStatusConfig.NOT_STARTED;
                  const typeConfig = investorTypeConfig[user.investorType] || investorTypeConfig.RETAIL;
                  const tierConfig = membershipConfig[user.membershipTier] || membershipConfig.FREE;
                  const KycIcon = kycConfig.icon;

                  return (
                    <TableRow key={user.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl || undefined} />
                            <AvatarFallback className="bg-violet-100 text-violet-700">
                              {(user.fullName || user.email)?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900">
                              {user.fullName || user.displayName || 'No name'}
                            </p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                          {user.isAdmin && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Admin
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-600">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="text-sm">
                            {user.city ? `${user.city}, ` : ''}{user.countryName || user.country || '-'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={typeConfig.color}>
                          {typeConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${kycConfig.color} flex items-center gap-1 w-fit`}>
                          <KycIcon className="h-3 w-3" />
                          {kycConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={tierConfig.color}>
                          {tierConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(user.totalInvested || 0)}
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Update KYC
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <UserX className="h-4 w-4 mr-2" />
                              {user.isBanned ? 'Unban User' : 'Ban User'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* User Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Complete profile and investment information
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <Tabs defaultValue="profile" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="investments">Investments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4 mt-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedUser.avatarUrl || undefined} />
                      <AvatarFallback className="bg-violet-100 text-violet-700 text-xl">
                        {(selectedUser.fullName || selectedUser.email)?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedUser.fullName || selectedUser.displayName || 'No name'}
                      </h3>
                      <p className="text-slate-500">{selectedUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-medium">
                        {selectedUser.city ? `${selectedUser.city}, ` : ''}
                        {selectedUser.countryName || selectedUser.country || '-'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium">{selectedUser.phone || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-500">Member Since</p>
                      <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-500">Last Login</p>
                      <p className="font-medium">{formatDate(selectedUser.lastLoginAt)}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="compliance" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500 mb-1">KYC Status</p>
                      <Badge className={kycStatusConfig[selectedUser.kycStatus]?.color || 'bg-slate-100'}>
                        {kycStatusConfig[selectedUser.kycStatus]?.label || selectedUser.kycStatus}
                      </Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500 mb-1">Investor Type</p>
                      <Badge className={investorTypeConfig[selectedUser.investorType]?.color || 'bg-slate-100'}>
                        {investorTypeConfig[selectedUser.investorType]?.label || selectedUser.investorType}
                      </Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500 mb-1">Compliance Status</p>
                      <Badge className="bg-slate-100 text-slate-600">
                        {selectedUser.complianceStatus}
                      </Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500 mb-1">Investor Status</p>
                      <p className="font-medium">{selectedUser.investorStatus || '-'}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="investments" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 mb-1">Total Invested</p>
                      <p className="text-2xl font-bold text-green-700">
                        {formatCurrency(selectedUser.totalInvested || 0)}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">Total Returns</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {formatCurrency(selectedUser.totalReturns || 0)}
                      </p>
                    </div>
                    <div className="p-4 bg-violet-50 rounded-lg">
                      <p className="text-sm text-violet-600 mb-1">Active Investments</p>
                      <p className="text-2xl font-bold text-violet-700">
                        {selectedUser.activeInvestments || 0}
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <p className="text-sm text-amber-600 mb-1">Membership</p>
                      <Badge className={membershipConfig[selectedUser.membershipTier]?.color || 'bg-slate-100'}>
                        {membershipConfig[selectedUser.membershipTier]?.label || selectedUser.membershipTier}
                      </Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const useState = React.useState;

const monthlyData = [
  { month: 'Jan', revenue: 45000, customers: 28, orders: 35, profit: 18000, expenses: 27000 },
  { month: 'Feb', revenue: 52000, customers: 32, orders: 42, profit: 21000, expenses: 31000 },
  { month: 'Mar', revenue: 48000, customers: 30, orders: 38, profit: 19500, expenses: 28500 },
  { month: 'Apr', revenue: 61000, customers: 38, orders: 45, profit: 24500, expenses: 36500 },
  { month: 'May', revenue: 58000, customers: 36, orders: 41, profit: 23000, expenses: 35000 },
  { month: 'Jun', revenue: 67000, customers: 42, orders: 48, profit: 27000, expenses: 40000 },
  { month: 'Jul', revenue: 72000, customers: 45, orders: 52, profit: 29000, expenses: 43000 }
];

const customerSegmentData = [
  { name: 'VIP', value: 25, count: 312, color: '#F39C12' },
  { name: 'Regular', value: 45, count: 562, color: '#1F3A93' },
  { name: 'New', value: 30, count: 375, color: '#2ECC71' }
];

const orderStatusData = [
  { status: 'Completed', count: 145, percentage: 58 },
  { status: 'In Progress', count: 67, percentage: 27 },
  { status: 'Pending', count: 23, percentage: 9 },
  { status: 'Cancelled', count: 15, percentage: 6 }
];

const weeklyPerformance = [
  { day: 'Mon', orders: 8, revenue: 12000, customers: 6 },
  { day: 'Tue', orders: 12, revenue: 18000, customers: 9 },
  { day: 'Wed', orders: 10, revenue: 15000, customers: 8 },
  { day: 'Thu', orders: 15, revenue: 22000, customers: 12 },
  { day: 'Fri', orders: 18, revenue: 28000, customers: 15 },
  { day: 'Sat', orders: 22, revenue: 35000, customers: 18 },
  { day: 'Sun', orders: 14, revenue: 21000, customers: 11 }
];

const revenueDetailData = [
  { category: 'Suits', revenue: 45000, growth: 12, orders: 25 },
  { category: 'Blazers', revenue: 28000, growth: 8, orders: 18 },
  { category: 'Kurtas', revenue: 15000, growth: 15, orders: 12 },
  { category: 'Lehengas', revenue: 35000, growth: 20, orders: 8 },
  { category: 'Accessories', revenue: 8000, growth: 5, orders: 15 }
];

const orderDetailData = [
  { status: 'Completed', count: 145, revenue: 320000, avgTime: 7 },
  { status: 'In Progress', count: 67, revenue: 148000, avgTime: 4 },
  { status: 'Pending', count: 23, revenue: 51000, avgTime: 1 },
  { status: 'Cancelled', count: 15, revenue: 0, avgTime: 2 }
];

const performanceMetrics = [
  { metric: 'Order Fulfillment Rate', value: 92, target: 95, trend: 'up' },
  { metric: 'Customer Satisfaction', value: 88, target: 90, trend: 'up' },
  { metric: 'On-Time Delivery', value: 85, target: 90, trend: 'down' },
  { metric: 'Quality Score', value: 94, target: 95, trend: 'up' },
  { metric: 'Return Rate', value: 8, target: 5, trend: 'down' }
];

const transactionTypes = [
  { value: 'revenue', label: 'Revenue' },
  { value: 'expense', label: 'Expense' },
  { value: 'refund', label: 'Refund' },
  { value: 'adjustment', label: 'Adjustment' }
];

const expenseCategories = [
  { value: 'fabric', label: 'Fabric & Materials' },
  { value: 'tailoring', label: 'Tailoring Costs' },
  { value: 'delivery', label: 'Delivery & Logistics' },
  { value: 'rent', label: 'Rent & Utilities' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Other' }
];

const Reports = () => {
  const { toast } = useToast();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState("revenue");
  const [transactionForm, setTransactionForm] = useState({
    type: '',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transaction Added",
      description: `${transactionForm.type} of ₹${transactionForm.amount} has been recorded`,
    });
    setTransactionForm({
      type: '',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowTransactionForm(false);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.name.includes('revenue') || entry.name.includes('amount') 
                ? `₹${entry.value.toLocaleString()}` 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const InteractiveBarChart = ({ data, dataKey, name, color }: any) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey={dataKey} 
          fill={color} 
          name={name}
          radius={[4, 4, 0, 0]}
          onMouseEnter={(data, index) => {
            // Add hover effects or additional interactions here
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const InteractiveLineChart = ({ data, lines }: any) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="metric" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {lines.map((line: any, index: number) => (
          <Line 
            key={index}
            type="monotone" 
            dataKey={line.dataKey} 
            stroke={line.color} 
            strokeWidth={2}
            name={line.name}
            dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: line.color, strokeWidth: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  const InteractivePieChart = ({ data }: any) => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="count"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color || `hsl(${index * 45}, 70%, 50%)`} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} generated successfully`,
    });
  };

  const handleAddTransaction = () => {
    setShowTransactionForm(true);
  };

  // Calculate key metrics
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const customerGrowth = ((currentMonth.customers - previousMonth.customers) / previousMonth.customers * 100).toFixed(1);
  const orderGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders * 100).toFixed(1);
  const profitMargin = ((currentMonth.profit / currentMonth.revenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Business insights and performance analytics
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => handleAction("Export PDF Report")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={handleAddTransaction}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-primary">₹{currentMonth.revenue.toLocaleString()}</p>
              </div>
              <div className="flex items-center text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{revenueGrowth}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold text-accent">{currentMonth.customers}</p>
              </div>
              <div className="flex items-center text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{customerGrowth}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-warning">{currentMonth.orders}</p>
              </div>
              <div className="flex items-center text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{orderGrowth}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold text-success">{profitMargin}%</p>
              </div>
              <Badge className="bg-success text-success-foreground">
                Healthy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Report Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-16" onClick={() => handleAction("Customer Report")}>
          <div className="text-center">
            <Users className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Customer Report</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16" onClick={() => handleAction("Revenue Report")}>
          <div className="text-center">
            <DollarSign className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Revenue Report</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16" onClick={() => handleAction("Orders Report")}>
          <div className="text-center">
            <Package className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Orders Report</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16" onClick={handleAddTransaction}>
          <div className="text-center">
            <BarChart3 className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Performance</p>
          </div>
        </Button>
      </div>

      {/* Interactive Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Interactive Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeReportTab} onValueChange={setActiveReportTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue">Revenue Reports</TabsTrigger>
              <TabsTrigger value="orders">Order Reports</TabsTrigger>
              <TabsTrigger value="performance">Performance Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InteractiveBarChart 
                      data={revenueDetailData}
                      dataKey="revenue"
                      name="Revenue"
                      color="#1F3A93"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Rate by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InteractiveBarChart 
                      data={revenueDetailData}
                      dataKey="growth"
                      name="Growth %"
                      color="#2ECC71"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueDetailData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="font-medium">{item.category}</p>
                          <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">₹{item.revenue.toLocaleString()}</p>
                          <p className={`text-sm ${item.growth > 0 ? 'text-success' : 'text-destructive'}`}>
                            {item.growth > 0 ? '+' : ''}{item.growth}% growth
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InteractivePieChart data={orderDetailData} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Order Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InteractiveBarChart 
                      data={orderDetailData}
                      dataKey="revenue"
                      name="Revenue"
                      color="#F39C12"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Order Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderDetailData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="font-medium">{item.status}</p>
                          <p className="text-sm text-muted-foreground">Avg processing: {item.avgTime} days</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{item.count} orders</p>
                          <p className="text-sm text-muted-foreground">₹{item.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics vs Targets</CardTitle>
                </CardHeader>
                <CardContent>
                  <InteractiveLineChart 
                    data={performanceMetrics}
                    lines={[
                      { dataKey: 'value', color: '#1F3A93', name: 'Current Value' },
                      { dataKey: 'target', color: '#2ECC71', name: 'Target' }
                    ]}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{metric.metric}</p>
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">
                            {metric.value}{metric.metric.includes('Rate') ? '%' : ''}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Target: {metric.target}{metric.metric.includes('Rate') ? '%' : ''}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                metric.value >= metric.target ? 'bg-success' : 'bg-warning'
                              }`}
                              style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue & Profit Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  `₹${value.toLocaleString()}`, 
                  name === 'revenue' ? 'Revenue' : 'Profit'
                ]} />
                <Area type="monotone" dataKey="revenue" stroke="#1F3A93" fill="#1F3A93" fillOpacity={0.3} />
                <Area type="monotone" dataKey="profit" stroke="#2ECC71" fill="#2ECC71" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {customerSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {customerSegmentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.count} customers</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${
                      item.status === 'Completed' ? 'bg-success text-success-foreground' :
                      item.status === 'In Progress' ? 'bg-warning text-warning-foreground' :
                      item.status === 'Pending' ? 'bg-muted text-muted-foreground' :
                      'bg-destructive text-destructive-foreground'
                    }`}>
                      {item.status === 'Completed' ? <CheckCircle className="h-4 w-4" /> :
                       item.status === 'In Progress' ? <Clock className="h-4 w-4" /> :
                       <Package className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{item.status}</p>
                      <p className="text-sm text-muted-foreground">{item.count} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'Customers'
                ]} />
                <Line type="monotone" dataKey="orders" stroke="#1F3A93" strokeWidth={2} />
                <Line type="monotone" dataKey="customers" stroke="#2ECC71" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Monthly Revenue vs Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
              <Bar dataKey="revenue" fill="#1F3A93" name="Revenue" />
              <Bar dataKey="expenses" fill="#E74C3C" name="Expenses" />
              <Bar dataKey="profit" fill="#2ECC71" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Add Transaction Dialog */}
      <Dialog open={showTransactionForm} onOpenChange={setShowTransactionForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTransactionSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">Transaction Type</Label>
              <Select value={transactionForm.type} onValueChange={(value) => setTransactionForm({ ...transactionForm, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={transactionForm.category} onValueChange={(value) => setTransactionForm({ ...transactionForm, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={transactionForm.amount}
                onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                placeholder="Enter amount"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={transactionForm.date}
                onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={transactionForm.description}
                onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
                placeholder="Enter description"
                required
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowTransactionForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Transaction</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
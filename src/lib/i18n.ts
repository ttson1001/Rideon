export const translations = {
  vi: {
    // Navigation
    nav: {
      home: "Trang chủ",
      browse: "Tìm xe",
      about: "Tìm hiểu",
      contact: "Liên hệ",
      becomeOwner: "Trở thành chủ xe",
      login: "Đăng nhập",
      register: "Đăng ký",
      profile: "Hồ sơ cá nhân",
      dashboard: "Dashboard",
      notifications: "Thông báo",
      settings: "Cài đặt",
      menu: "Menu",
      logout: "Đăng xuất",
      menuDescription: "Điều hướng và tùy chọn tài khoản"
    },
    // Authentication
    auth: {
      login: "Đăng nhập",
      register: "Đăng ký",
      logout: "Đăng xuất",
      forgotPassword: "Quên mật khẩu",
      rememberMe: "Ghi nhớ đăng nhập",
      signInWith: "Đăng nhập với",
      signUpWith: "Đăng ký với",
      alreadyHaveAccount: "Đã có tài khoản?",
      dontHaveAccount: "Chưa có tài khoản?",
    },
    // Common
    common: {
      search: "Tìm kiếm",
      filter: "Lọc",
      sort: "Sắp xếp",
      save: "Lưu",
      cancel: "Hủy",
      edit: "Chỉnh sửa",
      delete: "Xóa",
      view: "Xem",
      back: "Quay lại",
      next: "Tiếp theo",
      previous: "Trước",
      loading: "Đang tải...",
      error: "Lỗi",
      success: "Thành công",
      confirm: "Xác nhận",
      close: "Đóng",
    },
    // Homepage
    home: {
      hero: {
        title: "Thuê xe máy dễ dàng",
        subtitle: "Khám phá thành phố với những chiếc xe máy chất lượng cao",
        searchPlaceholder: "Bạn muốn đi đâu?",
        rentNow: "Thuê ngay",
      },
      features: {
        title: "Tại sao chọn chúng tôi?",
        easy: {
          title: "Đặt xe dễ dàng",
          description: "Quy trình đặt xe đơn giản chỉ với vài thao tác",
        },
        safe: {
          title: "An toàn & Bảo hiểm",
          description: "Tất cả xe đều được bảo hiểm và kiểm tra định kỳ",
        },
        support: {
          title: "Hỗ trợ 24/7",
          description: "Đội ngũ hỗ trợ sẵn sàng giúp đỡ mọi lúc",
        },
      },
    },
    // Dashboard
    dashboard: {
      renter: {
        title: "Dashboard Người thuê",
        tabs: {
          overview: "Tổng quan",
          active: "Đang thuê",
          history: "Lịch sử",
          requests: "Yêu cầu",
        },
        stats: {
          totalRentals: "Tổng chuyến đi",
          activeRentals: "Đang thuê",
          totalSpent: "Tổng chi tiêu",
          avgRating: "Đánh giá TB",
        },
      },
      owner: {
        title: "Dashboard Chủ xe",
        tabs: {
          overview: "Tổng quan",
          vehicles: "Xe của tôi",
          bookings: "Đặt xe",
          requests: "Yêu cầu",
        },
      },
    },
    // Settings
    settings: {
      title: "Cài đặt",
      description: "Quản lý tài khoản và tùy chọn ứng dụng",
      tabs: {
        account: "Tài khoản",
        notifications: "Thông báo",
        privacy: "Quyền riêng tư",
        appearance: "Giao diện",
        security: "Bảo mật",
      },
      account: {
        title: "Thông tin tài khoản",
        description: "Cập nhật thông tin cơ bản của tài khoản",
        firstName: "Họ",
        lastName: "Tên",
        phone: "Số điện thoại",
        saveChanges: "Lưu thay đổi",
        dangerZone: "Vùng nguy hiểm",
        dangerDescription: "Các hành động không thể hoàn tác",
        downloadData: "Tải xuống dữ liệu",
        downloadDescription: "Tải xuống tất cả dữ liệu của bạn",
        download: "Tải xuống",
        deleteAccount: "Xóa tài khoản",
        deleteDescription: "Xóa vĩnh viễn tài khoản và tất cả dữ liệu",
      },
      notifications: {
        title: "Cài đặt thông báo",
        description: "Chọn cách bạn muốn nhận thông báo",
        email: "Thông báo qua Email",
        emailDescription: "Nhận thông báo qua email",
        push: "Thông báo đẩy",
        pushDescription: "Nhận thông báo trên thiết bị",
        sms: "Tin nhắn SMS",
        smsDescription: "Nhận thông báo qua SMS",
        types: "Loại thông báo",
        bookingUpdates: "Cập nhật đặt xe",
        bookingDescription: "Thông báo về trạng thái đặt xe",
        paymentAlerts: "Cảnh báo thanh toán",
        paymentDescription: "Thông báo về giao dịch thanh toán",
        newMessages: "Tin nhắn mới",
        messagesDescription: "Thông báo khi có tin nhắn mới",
        marketing: "Email marketing",
        marketingDescription: "Nhận email về ưu đãi và khuyến mãi",
      },
      privacy: {
        title: "Quyền riêng tư",
        description: "Kiểm soát ai có thể xem thông tin của bạn",
        profileVisible: "Hồ sơ công khai",
        profileDescription: "Cho phép người khác xem hồ sơ của bạn",
        showEmail: "Hiển thị email",
        emailDescription: "Cho phép người khác xem email của bạn",
        showPhone: "Hiển thị số điện thoại",
        phoneDescription: "Cho phép người khác xem số điện thoại",
        allowMessages: "Cho phép nhắn tin",
        messagesDescription: "Cho phép người khác gửi tin nhắn cho bạn",
      },
      appearance: {
        title: "Giao diện",
        description: "Tùy chỉnh giao diện ứng dụng",
        theme: "Chủ đề",
        themeDescription: "Chọn chủ đề hiển thị",
        light: "Sáng",
        dark: "Tối",
        system: "Hệ thống",
        language: "Ngôn ngữ",
      },
      security: {
        title: "Bảo mật",
        description: "Quản lý bảo mật tài khoản",
        currentPassword: "Mật khẩu hiện tại",
        currentPasswordPlaceholder: "Nhập mật khẩu hiện tại",
        newPassword: "Mật khẩu mới",
        newPasswordPlaceholder: "Nhập mật khẩu mới",
        confirmPassword: "Xác nhận mật khẩu mới",
        confirmPasswordPlaceholder: "Nhập lại mật khẩu mới",
        changePassword: "Đổi mật khẩu",
        twoFactor: "Xác thực hai yếu tố",
        smsAuth: "Xác thực qua SMS",
        smsDescription: "Thêm lớp bảo mật bằng SMS",
        appAuth: "Ứng dụng xác thực",
        appDescription: "Sử dụng Google Authenticator hoặc tương tự",
        setup: "Thiết lập",
        sessions: "Phiên đăng nhập",
        currentSession: "Hiện tại • TP.HCM, Việt Nam",
        current: "Hiện tại",
        recentSession: "2 giờ trước • TP.HCM, Việt Nam",
        signOut: "Đăng xuất",
        signOutAll: "Đăng xuất tất cả thiết bị khác",
      },
    },
    stats: {
      totalVehicles: "Tổng số xe",
      totalUsers: "Tổng người dùng",
      monthlyRevenue: "Doanh thu tháng",
      pendingReports: "Báo cáo chờ xử lý"
    },
    admin: {
      chat: {
        title: "Tin nhắn hỗ trợ",
        subtitle: "Hỗ trợ người dùng và xử lý khiếu nại",
        conversations: "Cuộc trò chuyện",
        searchPlaceholder: "Tìm kiếm...",
        messagePlaceholder: "Nhập tin nhắn...",
        selectChat: "Chọn cuộc trò chuyện",
        selectChatDesc: "Chọn một cuộc trò chuyện để bắt đầu hỗ trợ",
        priority: {
          high: "Cao",
          medium: "TB",
          low: "Thấp"
        },
        status: {
          pending: "Chờ xử lý",
          active: "Đang xử lý",
          resolved: "Đã giải quyết"
        }
      },
      notifications: {
        title: "Thông báo Admin",
        subtitle: {
          unread: "Bạn có %{count} thông báo chưa đọc",
          allRead: "Bạn đã đọc hết thông báo"
        },
        markAll: "Đánh dấu tất cả",
        filter: {
          placeholder: "Lọc thông báo",
          all: "Tất cả thông báo",
          unread: "Chưa đọc",
          urgent: "Khẩn cấp",
          high: "Ưu tiên cao"
        },
        priority: {
          urgent: "Khẩn cấp",
          high: "Cao",
          medium: "Trung bình",
          low: "Thấp"
        },
        empty: {
          title: "Không có thông báo",
          description: "Tất cả thông báo đã được xử lý"
        },
        viewDetails: "Xem chi tiết"
      },
      sidebar: {
        title: "Admin Panel",
        subtitle: "Quản trị hệ thống",
        dashboard: "Dashboard",
        notifications: "Thông báo",
        chat: "Tin nhắn",
        pendingVehicles: "Duyệt xe mới",
        users: "Quản lý người dùng",
        transactions: "Giao dịch",
        violations: "Báo cáo vi phạm",
        logout: "Đăng xuất"
      },
      pendingVehicles: {
        title: "Duyệt xe mới",
        subtitle: "Quản lý các xe đang chờ duyệt",
        pendingCount: {
          "0": "Không có xe chờ duyệt",
          "1": "1 xe chờ duyệt",
          "2": "2 xe chờ duyệt",
          "3": "3 xe chờ duyệt",
          "other": "%{count} xe chờ duyệt"
        },
        table: {
          vehicle: "Xe",
          owner: "Chủ xe",
          submitDate: "Ngày gửi",
          documents: "Tài liệu",
          completeness: "Độ hoàn thiện",
          status: "Trạng thái",
          actions: "Hành động"
        }
      },
      users: {
        title: "Quản lý người dùng",
        subtitle: "Manage and monitor system users",
        createStaff: "Tạo nhân viên mới",
        table: {
          user: "Người dùng",
          role: "Vai trò",
          status: "Trạng thái",
          vehicles: "Số xe",
          rentals: "Lượt thuê",
          joinDate: "Ngày tham gia",
          lastActive: "Hoạt động gần nhất",
          actions: "Thao tác"
        }
      },
      transactions: {
        title: "Giao dịch",
        subtitle: "Manage transactions",
        table: {
          transaction: "Giao dịch",
          renter: "Người thuê",
          owner: "Chủ xe",
          rentalFee: "Phí thuê",
          commission: "Hoa hồng",
          amountToOwner: "Số tiền chủ xe",
          date: "Ngày giao dịch",
          status: "Trạng thái",
          actions: "Thao tác"
        },
      },
      violations: {
        title: "Báo cáo vi phạm",
        subtitle: "Manage violation reports",
        // ... other violation-related translations
      }
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      browse: "Browse",
      about: "About",
      contact: "Contact",
      becomeOwner: "Become Owner",
      login: "Login",
      register: "Register",
      profile: "Profile",
      dashboard: "Dashboard",
      notifications: "Notifications",
      settings: "Settings",
      menu: "Menu",
      logout: "Logout",
      menuDescription: "Navigation and account options"
    },
    // Authentication
    auth: {
      login: "Login",
      register: "Register",
      logout: "Logout",
      forgotPassword: "Forgot Password",
      rememberMe: "Remember me",
      signInWith: "Sign in with",
      signUpWith: "Sign up with",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
    },
    // Common
    common: {
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      back: "Back",
      next: "Next",
      previous: "Previous",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      confirm: "Confirm",
      close: "Close",
    },
    // Homepage
    home: {
      hero: {
        title: "Rent Motorbikes Easily",
        subtitle: "Explore the city with high-quality motorbikes",
        searchPlaceholder: "Where do you want to go?",
        rentNow: "Rent Now",
      },
      features: {
        title: "Why choose us?",
        easy: {
          title: "Easy Booking",
          description: "Simple booking process with just a few clicks",
        },
        safe: {
          title: "Safe & Insured",
          description: "All bikes are insured and regularly inspected",
        },
        support: {
          title: "24/7 Support",
          description: "Support team ready to help anytime",
        },
      },
    },
    // Dashboard
    dashboard: {
      renter: {
        title: "Renter Dashboard",
        tabs: {
          overview: "Overview",
          active: "Active",
          history: "History",
          requests: "Requests",
        },
        stats: {
          totalRentals: "Total Trips",
          activeRentals: "Active Rentals",
          totalSpent: "Total Spent",
          avgRating: "Avg Rating",
        },
      },
      owner: {
        title: "Owner Dashboard",
        tabs: {
          overview: "Overview",
          vehicles: "My Vehicles",
          bookings: "Bookings",
          requests: "Requests",
        },
      },
    },
    // Settings
    settings: {
      title: "Settings",
      description: "Manage your account and app preferences",
      tabs: {
        account: "Account",
        notifications: "Notifications",
        privacy: "Privacy",
        appearance: "Appearance",
        security: "Security",
      },
      account: {
        title: "Account Information",
        description: "Update your basic account information",
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone Number",
        saveChanges: "Save Changes",
        dangerZone: "Danger Zone",
        dangerDescription: "Irreversible actions",
        downloadData: "Download Data",
        downloadDescription: "Download all your data",
        download: "Download",
        deleteAccount: "Delete Account",
        deleteDescription: "Permanently delete account and all data",
      },
      notifications: {
        title: "Notification Settings",
        description: "Choose how you want to receive notifications",
        email: "Email Notifications",
        emailDescription: "Receive notifications via email",
        push: "Push Notifications",
        pushDescription: "Receive notifications on device",
        sms: "SMS Messages",
        smsDescription: "Receive notifications via SMS",
        types: "Notification Types",
        bookingUpdates: "Booking Updates",
        bookingDescription: "Notifications about booking status",
        paymentAlerts: "Payment Alerts",
        paymentDescription: "Notifications about payment transactions",
        newMessages: "New Messages",
        messagesDescription: "Notifications when you receive new messages",
        marketing: "Marketing Emails",
        marketingDescription: "Receive emails about offers and promotions",
      },
      privacy: {
        title: "Privacy",
        description: "Control who can see your information",
        profileVisible: "Public Profile",
        profileDescription: "Allow others to view your profile",
        showEmail: "Show Email",
        emailDescription: "Allow others to see your email",
        showPhone: "Show Phone Number",
        phoneDescription: "Allow others to see your phone number",
        allowMessages: "Allow Messages",
        messagesDescription: "Allow others to send you messages",
      },
      appearance: {
        title: "Appearance",
        description: "Customize app appearance",
        theme: "Theme",
        themeDescription: "Choose display theme",
        light: "Light",
        dark: "Dark",
        system: "System",
        language: "Language",
      },
      security: {
        title: "Security",
        description: "Manage account security",
        currentPassword: "Current Password",
        currentPasswordPlaceholder: "Enter current password",
        newPassword: "New Password",
        newPasswordPlaceholder: "Enter new password",
        confirmPassword: "Confirm New Password",
        confirmPasswordPlaceholder: "Re-enter new password",
        changePassword: "Change Password",
        twoFactor: "Two-Factor Authentication",
        smsAuth: "SMS Authentication",
        smsDescription: "Add security layer with SMS",
        appAuth: "Authenticator App",
        appDescription: "Use Google Authenticator or similar",
        setup: "Setup",
        sessions: "Login Sessions",
        currentSession: "Current • Ho Chi Minh City, Vietnam",
        current: "Current",
        recentSession: "2 hours ago • Ho Chi Minh City, Vietnam",
        signOut: "Sign Out",
        signOutAll: "Sign out all other devices",
      },
    },
    stats: {
      totalVehicles: "Total Vehicles",
      totalUsers: "Total Users",
      monthlyRevenue: "Monthly Revenue",
      pendingReports: "Pending Reports"
    },
    admin: {
      chat: {
        title: "Support Messages",
        subtitle: "Support users and handle complaints",
        conversations: "Conversations",
        searchPlaceholder: "Search...",
        messagePlaceholder: "Type a message...",
        selectChat: "Select a conversation",
        selectChatDesc: "Select a conversation to start supporting",
        priority: {
          high: "High",
          medium: "Medium",
          low: "Low"
        },
        status: {
          pending: "Pending",
          active: "Active",
          resolved: "Resolved"
        }
      },
      notifications: {
        title: "Admin Notifications",
        subtitle: {
          unread: "You have %{count} unread notifications",
          allRead: "You have read all notifications"
        },
        markAll: "Mark all as read",
        filter: {
          placeholder: "Filter notifications",
          all: "All notifications",
          unread: "Unread",
          urgent: "Urgent",
          high: "High priority"
        },
        priority: {
          urgent: "Urgent",
          high: "High",
          medium: "Medium",
          low: "Low"
        },
        empty: {
          title: "No notifications",
          description: "All notifications have been processed"
        },
        viewDetails: "View details"
      },
      sidebar: {
        title: "Admin Panel",
        subtitle: "System Administration",
        dashboard: "Dashboard",
        notifications: "Notifications",
        chat: "Messages",
        pendingVehicles: "Pending Vehicles",
        users: "User Management",
        transactions: "Transactions",
        violations: "Violation Reports",
        logout: "Logout"
      },
      pendingVehicles: {
        title: "Pending Vehicles",
        subtitle: "Manage vehicles awaiting approval",
        pendingCount: {
          "0": "No vehicles pending",
          "1": "1 vehicle pending",
          "2": "2 vehicles pending",
          "3": "3 vehicles pending",
          "other": "%{count} vehicles pending"
        },
        table: {
          vehicle: "Vehicle",
          owner: "Owner",
          submitDate: "Submit Date",
          documents: "Documents",
          completeness: "Completeness",
          status: "Status",
          actions: "Actions"
        }
      },
      users: {
        title: "User Management",
        subtitle: "Manage and monitor system users",
        createStaff: "Create Staff",
        table: {
          user: "Người dùng",
          role: "Vai trò",
          status: "Trạng thái",
          vehicles: "Số xe",
          rentals: "Lượt thuê",
          joinDate: "Ngày tham gia",
          lastActive: "Hoạt động gần nhất",
          actions: "Thao tác"
        }
      },
      transactions: {
        title: "Transactions",
        subtitle: "Manage transactions",
        table: {
          transaction: "Giao dịch",
          renter: "Người thuê",
          owner: "Chủ xe",
          rentalFee: "Phí thuê",
          commission: "Hoa hồng",
          amountToOwner: "Số tiền chủ xe",
          date: "Ngày giao dịch",
          status: "Trạng thái",
          actions: "Thao tác"
        },
      },
      violations: {
        title: "Violation Reports",
        subtitle: "Manage violation reports",
        // ... other violation-related translations
      }
    },
  },
}

export type Language = keyof typeof translations
export type TranslationKey = string

export function getNestedTranslation(obj: any, path: string): string {
  return path.split(".").reduce((current, key) => current?.[key], obj) || path
}

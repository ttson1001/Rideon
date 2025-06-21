import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Điều khoản sử dụng
          </h1>
          <p className="text-gray-600">
            Cập nhật lần cuối: 15/01/2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Giới thiệu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Chào mừng bạn đến với MotoBike - nền tảng thuê xe máy trực tuyến. 
                Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các 
                điều khoản và điều kiện được nêu trong tài liệu này.
              </p>
              <p className="text-gray-700">
                MotoBike là nền tảng kết nối người có nhu cầu thuê xe máy với 
                những chủ xe sẵn sàng cho thuê. Chúng tôi không sở hữu xe máy 
                mà chỉ cung cấp nền tảng để tạo điều kiện cho các giao dịch.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Định nghĩa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-900">"Nền tảng"</strong>
                  <p className="text-gray-700">Ứng dụng web MotoBike và tất cả các dịch vụ liên quan.</p>
                </div>
                <div>
                  <strong className="text-gray-900">"Người thuê"</strong>
                  <p className="text-gray-700">Người dùng có nhu cầu thuê xe máy thông qua nền tảng.</p>
                </div>
                <div>
                  <strong className="text-gray-900">"Chủ xe"</strong>
                  <p className="text-gray-700">Người dùng đăng xe máy cho thuê trên nền tảng.</p>
                </div>
                <div>
                  <strong className="text-gray-900">"Chuyến thuê"</strong>
                  <p className="text-gray-700">Giao dịch thuê xe giữa người thuê và chủ xe.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Đăng ký tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">3.1 Yêu cầu đăng ký</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Phải từ 18 tuổi trở lên</li>
                  <li>Cung cấp thông tin chính xác và đầy đủ</li>
                  <li>Có giấy phép lái xe hợp lệ (đối với người thuê)</li>
                  <li>Có giấy đăng ký xe hợp lệ (đối với chủ xe)</li>
                </ul>
                
                <h4 className="font-semibold text-gray-900">3.2 Bảo mật tài khoản</h4>
                <p className="text-gray-700">
                  Bạn có trách nhiệm bảo mật thông tin đăng nhập và thông báo 
                  ngay cho chúng tôi nếu phát hiện tài khoản bị sử dụng trái phép.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Quy định cho người thuê</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">4.1 Điều kiện thuê xe</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Có giấy phép lái xe phù hợp với loại xe thuê</li>
                  <li>Đặt cọc theo quy định của chủ xe</li>
                  <li>Tuân thủ luật giao thông đường bộ</li>
                  <li>Không sử dụng rượu bia khi lái xe</li>
                </ul>
                
                <h4 className="font-semibold text-gray-900">4.2 Trách nhiệm trong thời gian thuê</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Bảo quản xe cẩn thận, tránh hư hỏng</li>
                  <li>Chịu trách nhiệm về mọi vi phạm giao thông</li>
                  <li>Hoàn trả xe đúng thời gian và địa điểm</li>
                  <li>Báo cáo ngay nếu xảy ra sự cố</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Quy định cho chủ xe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">5.1 Điều kiện đăng xe</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Xe phải có giấy đăng ký hợp lệ</li>
                  <li>Bảo hiểm xe máy còn hiệu lực</li>
                  <li>Xe trong tình trạng kỹ thuật tốt</li>
                  <li>Cung cấp thông tin xe chính xác</li>
                </ul>
                
                <h4 className="font-semibold text-gray-900">5.2 Trách nhiệm với người thuê</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Giao xe đúng thời gian đã hẹn</li>
                  <li>Xe phải sạch sẽ và đầy xăng</li>
                  <li>Cung cấp đầy đủ giấy tờ xe</li>
                  <li>Hướng dẫn sử dụng xe nếu cần</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Thanh toán và phí dịch vụ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">6.1 Phí dịch vụ</h4>
                <p className="text-gray-700">
                  MotoBike thu phí dịch vụ 10% trên tổng giá trị chuyến thuê. 
                  Phí này đã bao gồm trong giá hiển thị cho người thuê.
                </p>
                
                <h4 className="font-semibold text-gray-900">6.2 Thanh toán</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Thanh toán qua ứng dụng hoặc tiền mặt</li>
                  <li>Tiền cọc được hoàn trả sau khi trả xe</li>
                  <li>Chủ xe nhận tiền trong vòng 24h sau khi hoàn thành chuyến</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Chính sách hủy và hoàn tiền</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">7.1 Hủy bởi người thuê</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Hủy trước 24h: Hoàn 100% tiền đã thanh toán</li>
                  <li>Hủy trong vòng 24h: Hoàn 50% tiền đã thanh toán</li>
                  <li>Hủy trong vòng 2h: Không hoàn tiền</li>
                </ul>
                
                <h4 className="font-semibold text-gray-900">7.2 Hủy bởi chủ xe</h4>
                <p className="text-gray-700">
                  Chủ xe hủy chuyến sẽ bị phạt và người thuê được hoàn 100% tiền.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Bảo hiểm và trách nhiệm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">8.1 Bảo hiểm</h4>
                <p className="text-gray-700">
                  Mọi xe trên nền tảng đều được bảo hiểm cơ bản. Tuy nhiên, 
                  người thuê vẫn chịu trách nhiệm về thiệt hại do lỗi cá nhân.
                </p>
                
                <h4 className="font-semibold text-gray-900">8.2 Giới hạn trách nhiệm</h4>
                <p className="text-gray-700">
                  MotoBike không chịu trách nhiệm về thiệt hại gián tiếp, 
                  mất mát dữ liệu, hoặc lợi nhuận bị mất.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Quyền riêng tư</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo 
                <strong> Chính sách bảo mật</strong> của MotoBike. Thông tin 
                chỉ được sử dụng để cung cấp dịch vụ và cải thiện trải nghiệm người dùng.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Thay đổi điều khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                MotoBike có quyền thay đổi điều khoản sử dụng bất kỳ lúc nào. 
                Những thay đổi sẽ có hiệu lực ngay khi được đăng tải trên nền tảng. 
                Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp nhận 
                các thay đổi đó.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Nếu bạn có bất kỳ câu hỏi nào về điều khoản sử dụng, vui lòng liên hệ với chúng tôi qua:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Email: support@motobike.com</li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms; 
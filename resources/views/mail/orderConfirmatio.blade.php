<html>

<head>
    <title>Order Confirmation</title>
</head>

<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
<div style="background-color: #f8f9fa; padding: 20px;">
    <div style="max-width: 1100px; margin: 0 auto; padding: 0 200px ; width: 65%;">
        <div style="background: white; padding: 20px; text-align: center;">
            <img src="/images/logo.png" alt="Logo" style="width: 200px;"/>
        </div>
        <div style="background: white; padding: 5% 20% ; color: #333; font-size: 1.0em;">
            <div style="font-size: 1.0em;">

                <h1 style="text-align: center;">Order Confirmation</h1>
                <p>Dear {{ $name }},<br>We are pleased to confirm the receipt of your payment and the processing of your
                    order with FurniVisual. Your transaction has been successfully processed, and we are committed to
                    providing you with an exceptional shopping experience.</p>
                <br>
                <h2>Order Details:</h2>
                <ul>
                    <li>Order Number: {{ $orderNumber }}</li>
                    <li>Order Date: {{ $orderDate }}</li>
                    <li>Total Amount: {{ $orderTotal }}</li>
                </ul>
            </div>
            <br>

            <h2>Products Details:</h2>
            <ul>
                @foreach($products as $product)
                    <div style="border: 1px solid #000; display: flex; justify-content: space-between; padding: 20px;">
                        <div style="width: 50%; padding-right: 20px;">
                            <img src="{{ $product->image ?? 'default-image-url' }}" alt="Product Image"
                                 style="width: 100%; object-fit: cover;">
                        </div>
                        <div style="width: 50%;">
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="font-size: 1.5em; font-weight: bold;">{{ $product->name }}</li>
                                <li style="margin-top: 10px;">{{ $product->short_description }}</li>
                                <li style="margin-top: 20px; font-size: 1.2em;">{{ $product->price }}€</li>
                            </ul>
                        </div>
                    </div>
                @endforeach
            </ul>

            <hr style="border: 1px solid #d6d8db;">

            <div style="font-size: 0.8em;">

                <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
                <p>Thank you for choosing our service!</p>
                <h2>Customer service</h2>
                <p>Our customer service team is at your disposal to address any questions or concerns you may have.
                    Please feel free to contact us:</p>
                <ul>
                    <li>
                        <strong>Phone:</strong> +1 800 123 4567
                    </li>
                    <li>
                        <strong>Email:</strong> office@furnivisual.com
                    </li>
                </ul>
                <p>We sincerely appreciate your trust in FurniVisual. We will strive to exceed your expectations at every
                    step of the purchasing process.</p>
                <p>Thank you for choosing us as your trusted provider.</p>
                <p>Sincerely,</p>
                <p>FurniVisual Team</p>
            </div>
        </div>
    </div>
</div>
</body>

</html>

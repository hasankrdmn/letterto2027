const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // 1️⃣ Şifrelenecek payload
    const payload = JSON.stringify({
      email: formData.email,
      title: formData.title,
      message: formData.message,
    });

    // 2️⃣ Tarayıcıda şifrele
    const encryptedBlob = await encryptMessage(
      payload,
      formData.password
    );

    // 3️⃣ Backend'e gönder
    await sendEncryptedBlob(encryptedBlob);

    // 4️⃣ Başarılı mesaj
    toast({
      title: "🎄 Mesajın geleceğe gönderildi!",
      description: "1 Ocak 2027'de e-postanı kontrol etmeyi unutma.",
    });

    // 5️⃣ Formu temizle
    setFormData({ email: '', title: '', message: '', password: '' });

  } catch (err) {
    console.error(err);
    toast({
      title: "Bir hata oluştu",
      description: "Mesaj gönderilemedi. Lütfen tekrar dene.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Competitor {
  id: string;
  competitor_name: string;
  competitor_domain: string | null;
}

const Settings = () => {
  const { user, loading: authLoading } = useAuth();
  
  // Loading state for auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [slackWebhook, setSlackWebhook] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [newCompetitor, setNewCompetitor] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
    loadCompetitors();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user!.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setBrandName(data.brand_name);
        setSlackWebhook(data.slack_webhook_url || "");
        setEmailNotifications(data.email_notifications);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setPageLoading(false);
    }
  };

  const loadCompetitors = async () => {
    try {
      const { data, error } = await supabase
        .from("competitors")
        .select("*")
        .eq("user_id", user!.id);

      if (error) throw error;
      setCompetitors(data || []);
    } catch (error) {
      console.error("Error loading competitors:", error);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user!.id,
          brand_name: brandName,
          slack_webhook_url: slackWebhook || null,
          email_notifications: emailNotifications,
        });

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your preferences have been updated",
      });
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addCompetitor = async () => {
    if (!newCompetitor.trim()) return;

    try {
      const { data, error } = await supabase
        .from("competitors")
        .insert({
          user_id: user!.id,
          competitor_name: newCompetitor.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      setCompetitors([...competitors, data]);
      setNewCompetitor("");

      toast({
        title: "Competitor added",
        description: `Now tracking ${newCompetitor}`,
      });
    } catch (error: any) {
      toast({
        title: "Error adding competitor",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeCompetitor = async (id: string) => {
    try {
      const { error } = await supabase.from("competitors").delete().eq("id", id);

      if (error) throw error;

      setCompetitors(competitors.filter((c) => c.id !== id));

      toast({
        title: "Competitor removed",
        description: "No longer tracking this competitor",
      });
    } catch (error: any) {
      toast({
        title: "Error removing competitor",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Brand Settings */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Brand Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Brand Name
                </label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Your Brand"
                />
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Slack Webhook URL
                </label>
                <Input
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                  placeholder="https://hooks.slack.com/services/..."
                  type="url"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Get instant alerts in your Slack channel
                </p>
              </div>
            </div>
          </Card>

          {/* Competitors */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Competitors</h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                  placeholder="Competitor name"
                  onKeyDown={(e) => e.key === "Enter" && addCompetitor()}
                />
                <Button onClick={addCompetitor} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {competitors.map((competitor) => (
                  <div
                    key={competitor.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <span className="font-medium">{competitor.competitor_name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCompetitor(competitor.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}

                {competitors.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No competitors added yet
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <Button onClick={saveSettings} disabled={saving} className="w-full gap-2">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;

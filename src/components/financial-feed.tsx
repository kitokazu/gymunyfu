import { FinancialPost } from "@/components/financial-post";
import { PostType } from "@/components/financial-post";

export function FinancialFeed() {
  // This would typically fetch from your database
  const posts = [
    {
      id: 1,
      type: "Analysis" as PostType,
      author: {
        name: "Tyler Lamy",
        image: "/placeholder.svg?height=40&width=40",
        handle: "@tlam",
      },
      content:
        "Just bought a house in Alabama. #RealEstate #Investing #RetireEarly #Accounting #PWC #Crypto hjk jk hj hj hj k ghj gh ",
      timestamp: "2h ago",
      likes: 245,
      comments: [
        {
          id: 1,
          author: {
            name: "Ory Ratoviz",
            image: "/placeholder.svg?height=32&width=32",
          },
          content: "This is great but can you please pay my rent?",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          likes: 12,
        },
        {
          id: 2,
          author: {
            name: "Sora Sato",
            image: "/placeholder.svg?height=32&width=32",
          },
          content: "Did you hear about Kai and his gf",
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          likes: 8,
        },
      ],
      shares: 12,
      saved: true,
    },
    {
      id: 2,
      type: "News" as PostType,
      author: {
        name: "Theo Hughes",
        image: "/placeholder.svg?height=40&width=40",
        handle: "@thughes",
      },
      content:
        "My dad just published a book and it was really good. 🪙 #Retire #Investment",
      timestamp: "4h ago",
      likes: 189,
      comments: [
        {
          id: 3,
          author: {
            name: "Kai Itokazu",
            image: "/placeholder.svg?height=32&width=32",
          },
          content: "Thanks to the book I am now in debt!",
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          likes: 15,
        },
      ],
      shares: 8,
    },
  ];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <FinancialPost key={post.id} post={post} />
      ))}
    </div>
  );
}

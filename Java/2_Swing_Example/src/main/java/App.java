import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Rectangle;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import net.miginfocom.swing.MigLayout;

public class App {

    public static void main(String[] args) {
        var f=new JFrame();//creating instance of JFrame

        var largePanel = new JPanel(new MigLayout("insets 20 20 20 20", "[][grow]"));
        f.add(largePanel);
        var panel = new JPanel(new MigLayout("", "[grow]"));

        var scrollPane = new JScrollPane(panel, ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED,
        ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
       
        scrollPane.scrollRectToVisible(null);
        scrollPane.getViewport().addChangeListener(new ChangeListener() {

            @Override
            public void stateChanged(ChangeEvent e) {
                   
                   if (panel.getHeight() > scrollPane.getHeight()) {
                        var rect = scrollPane.getBounds();            
                        rect.height = Math.min(panel.getHeight()+10, largePanel.getHeight() - 50);
                        scrollPane.setBounds(rect);   
                        scrollPane.setVerticalScrollBarPolicy(rect.height < panel.getHeight() ? ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS
                                                                                              : ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);   
                        scrollPane.revalidate();
                        scrollPane.repaint();                                                                                        
                   }
            }
        });        
       
        f.addComponentListener(new ComponentAdapter() {
            @Override
            public void componentResized(ComponentEvent e) {
                if (panel.getHeight() > scrollPane.getHeight()) {
                    var rect = scrollPane.getBounds();        
                    rect.height = Math.min(panel.getHeight()+10, largePanel.getHeight() - 50);
                    scrollPane.setBounds(rect);   
                    scrollPane.setVerticalScrollBarPolicy(rect.height < panel.getHeight() ? ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS
                                                                                          : ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);   
                    scrollPane.revalidate();
                    scrollPane.repaint();                                                                                        
               } else {
                    scrollPane.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);
               }
            }
        });

        panel.add(new JLabel("hello"), "wrap");
        panel.add(new JLabel("hello"), "wrap");
        panel.add(new JLabel("hello"), "wrap");
         
        scrollPane.setVisible(true);
       
        JButton b= new JButton("click");
        b.addActionListener(e -> {
            panel.add(new JLabel("hello sdfsadf sdfsdfs sadfasdfsaf sadfasdfsadf sadfasdfsdf"), "wrap");

            panel.revalidate();
            panel.repaint();            
         });

        b.setBounds(130,100,100, 40);//x axis, y axis, width, height

        largePanel.add(b);//adding button in JFrame
        largePanel.add(scrollPane, "width 350:350:350");
        f.setSize(600,500);//400 width and 500 height
        //f.setLayout(null);//using no layout managers
        f.setVisible(true);//making the frame visible
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}

